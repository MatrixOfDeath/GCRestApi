<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Commande;
use AppBundle\Entity\UtilisateursAdresses;
use AppBundle\Entity\Produit;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Payplug\Payplug;

/**
 * Commande controller.
 * @Rest\RouteResource("Commande")
 * @Route("commande")
 */
class CommandeController extends FOSRestController
{

    /**
     *   @Operation(
     *     tags={""},
     *     summary="Retourne les commandes",
     *     @SWG\Response(
     *         response="200",
     *         description="Returned when successful"
     *     )
     *    )
     * @return array
     *
     */
    public function cgetAction()
    {
        $em = $this->getDoctrine()->getManager();
        $place = $em->getRepository('AppBundle:Commande')->findAll();
        $view = $this->view($place);
        return $view;
    }

    /**
     * Lists all commande entities.
     *
     * @Route("/", name="commande_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $commandes = $em->getRepository('AppBundle:Commande')->findAll();

        return $this->render('commande/index.html.twig', array(
            'commandes' => $commandes,
        ));
    }

    /**
     * Creates a new commande entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/new", name="commande_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $commande = new Commande();
        $form = $this->createForm('AppBundle\Form\Type\CommandeType', $commande);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($commande);
            $em->flush();

            return $this->redirectToRoute('commande_show', array('idcommande' => $commande->getIdcommande()));
        }

        return $this->render('commande/new.html.twig', array(
            'commande' => $commande,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a commande entity.
     *
     * @Route("/{idcommande}", name="commande_show", requirements={"idcommande": "\d+"})
     * @Method("GET")
     */
    public function showAction(Commande $commande)
    {
        $deleteForm = $this->createDeleteForm($commande);

        return $this->render('commande/show.html.twig', array(
            'commande' => $commande,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing commande entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idcommande}/edit", name="commande_edit", requirements={"idcommande": "\d+"})
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Commande $commande)
    {
        $deleteForm = $this->createDeleteForm($commande);
        $editForm = $this->createForm('AppBundle\Form\Type\CommandeType', $commande);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('commande_edit', array('idcommande' => $commande->getIdcommande()));
        }

        return $this->render('commande/edit.html.twig', array(
            'commande' => $commande,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a commande entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idcommande}", name="commande_delete", requirements={"idcommande": "\d+"})
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Commande $commande)
    {
        $form = $this->createDeleteForm($commande);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($commande);
            $em->flush();
        }

        return $this->redirectToRoute('commande_index');
    }

    /**
     * Creates a form to delete a commande entity.
     *
     * @param Commande $commande The commande entity
     * @Security("has_role('ROLE_ADMIN')")
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Commande $commande)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('commande_delete', array('idcommande' => $commande->getIdcommande())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }

    /**
     *
     * @Route("/facture", name="facture")
     * @Method("GET")
     * @param SessionInterface $session
     * @return array
     */
    private function facture(SessionInterface $session)
    {
        $em = $this->getDoctrine()->getManager();

        $adresse = $session->get('adresse');
        $panier = $session->get('panier');
        $panier_salle = $session->get('panier_salle');
        $panier_place = $session->get('panier_place');

        $commande = array();
        $totalHT = 0;
        $totalTVA = 0;
        $totalSalleHT = 0;
        $totalSalleTVA = 0;
        $totalSalleTTC = 0;
        $totalPlaceHT = 0;
        $totalPlaceTVA = 0;
        $totalPlaceTTC = 0;
        $thirdHourFree = 0;

        $facturation = $em->getRepository('AppBundle:UtilisateursAdresses')->find($adresse['facturation']);
        $livraison = $em->getRepository('AppBundle:UtilisateursAdresses')->find($adresse['livraison']);
        $produits = $em->getRepository('AppBundle:Produit')->findArray(array_keys($session->get('panier')));
        $salles =  $em->getRepository('AppBundle:Salle')->findArray(array_keys($session->get('panier_salle')));
        $places =  $em->getRepository('AppBundle:Place')->findArray(array_keys($session->get('panier_place')));

        /**
         * Afin de s'y retrouver IDE
         * @var $produit \AppBundle\Entity\Produit
         */
        foreach($produits as $produit)
        {
            $prixHT = ($produit->getPrixproduit() * $panier[$produit->getIdproduit()]);
            $prixTTC = ($produit->getPrixproduit() * $panier[$produit->getIdproduit()] / $produit->getTva()->getMultiplicate());
            $totalHT += $prixHT;

            if (!isset($commande['tva']['%'.$produit->getTva()->getValeur()]))
                $commande['tva']['%'.$produit->getTva()->getValeur()] = round($prixTTC - $prixHT,2);
            else
                $commande['tva']['%'.$produit->getTva()->getValeur()] += round($prixTTC - $prixHT,2);

            $totalTVA += round($prixTTC - $prixHT,2);

            $commande['produit'][$produit->getIdproduit()] = array('reference' => $produit->getNomproduit(),
                'quantite' => $panier[$produit->getIdproduit()],
                'image' => $produit->getImage(),
                'nomtypeproduit' => $produit->getNomTypeProduit(),
                'prixHT' => round($produit->getPrixproduit(),2),
                'prixTTC' => round($produit->getPrixproduit() / $produit->getTva()->getMultiplicate(),2));
        }


        /**
         * fin de s'y retrouver IDE
         * @var $salle \AppBundle\Entity\Salle
         */
        foreach($salles as $salle) {
            // Complexity * 4 / 2 + Raisonnement -42
            $total30Minutes = $panier_salle[$salle->getIdsalle()]['totalHeures'] * 2;
            $totaleHeuresR = $panier_salle[$salle->getIdsalle()]['totalHeures'];
            $totaleMinutesR = $panier_salle[$salle->getIdsalle()]['totalMinutes'];

            if ($panier_salle[$salle->getIdsalle()]['totalMinutes'] >= 30) {
                $totalMinutes = (2 * $salle->getCapacitymax());
            } else {

                $totalMinutes = 0;
            }

            if ($totaleHeuresR >= 5 || ($totaleHeuresR >= 5 && $totaleMinutesR >= 30) ) {
                $totalSalleTTC = $totalSalleTTC + $salle->getPrixsalle() * 4;
                $prixSalleTTC = $salle->getPrixsalle() * 4;
                $commande['salle'][$salle->getIdsalle()]['journeeIllimitee'] = 1;
            }
            else if( ($totaleHeuresR == 3 && $total30Minutes >= 30) || $totaleHeuresR >= 4 ) {
                $totalSalleTTC =  $totalSalleTTC + $salle->getPrixsalle() + (($total30Minutes - 2 )* 2 * $salle->getCapacitymax()) + $totalMinutes - (2 * $salle->getCapacitymax());
                $thirdHourFree += (2 * $salle->getCapacitymax());
                $commande['salle'][$salle->getIdsalle()]['thirdHourFree'] = 1;

                $prixSalleTTC = $salle->getPrixsalle() + (($total30Minutes - 2 )* 2 * $salle->getCapacitymax()) + $totalMinutes - (2 * $salle->getCapacitymax());
            } else{
                $totalSalleTTC =  $totalSalleTTC + $salle->getPrixsalle() + (($total30Minutes - 2) * 2 * $salle->getCapacitymax()) + $totalMinutes;
                $prixSalleTTC =  $salle->getPrixsalle() + (($total30Minutes - 2) * 2 * $salle->getCapacitymax()) + $totalMinutes;
            }

            $prixSalleHT = $prixSalleTTC / (2 - $salle->getTva()->getMultiplicate()) ;
            $tvaSalle = $prixSalleTTC - $prixSalleHT;
            $totalSalleHT += $prixSalleHT;

            if (!isset($commande['tvaSalle']['%'.$salle->getTva()->getValeur()]))
                $commande['tvaSalle']['%'.$salle->getTva()->getValeur()] = round($tvaSalle,2);
            else
                $commande['tvaSalle']['%'.$salle->getTva()->getValeur()] += round($tvaSalle,2);

            $totalSalleTVA += round($prixSalleTTC - $prixSalleHT,2);
            $commande['salle'][$salle->getIdsalle()] = array(
                'reference' => $salle->getNomsalle(),
                'image' => $salle->getImage(),
                'heureDebut' => $panier_salle[$salle->getIdsalle()]['heureChoixDebut'],
                'heureFin' => $panier_salle[$salle->getIdsalle()]['heureChoixFin'],
                'date' => $panier_salle[$salle->getIdsalle()]['date'],
                'heures' => $totaleHeuresR,
                'minutes' => $totaleMinutesR,
                'idReservation' => $panier_salle[$salle->getIdsalle()]['idReservation'],
                'prixSalleHT' => round($prixSalleHT, 2),
                'prixHT' => round($salle->getPrixsalle(),2),
                'prixTTC' => round($prixSalleTTC,2),
            );
        }

        /**
         * fin de s'y retrouver IDE
         * @var $place \AppBundle\Entity\Place
         */
        foreach($places as $place) {
            // Complexity * 4 / 2 + Raisonnement -42
            $total30Minutes = $panier_place[$place->getIdplace()]['totalHeures'] * 2;
            $totaleHeuresR = $panier_place[$place->getIdplace()]['totalHeures'];
            $totaleMinutesR = $panier_place[$place->getIdplace()]['totalMinutes'];

            if ($panier_place[$place->getIdplace()]['totalMinutes'] >= 30) {
                $totalMinutes = 2;
            } else {
                $totalMinutes = 0;
            }

            if ($totaleHeuresR >= 5 || ($totaleHeuresR >= 5 && $totaleMinutesR >= 30) ) {
                $totalPlaceTTC = $totalPlaceTTC + $place->getPrixplace() * 4;
                $prixPlaceTTC = $place->getPrixplace() * 4;
                $commande['place'][$place->getIdplace()]['journeeIllimitee'] = 1;
            }
            else if( ($totaleHeuresR == 3 && $total30Minutes >= 30) || $totaleHeuresR >= 4 ) {
                $totalPlaceTTC =  $totalPlaceTTC + $place->getPrixplace() + (($total30Minutes - 2 ) * 2) + $totalMinutes - 2;
                $thirdHourFree += 2;
                $commande['place'][$place->getIdplace()]['thirdHourFree'] = 1;
                $prixPlaceTTC = $place->getPrixplace() + (($total30Minutes - 2 )* 2) + $totalMinutes - 2;
            } else{
                $totalPlaceTTC =  $totalPlaceTTC + $place->getPrixplace() + (($total30Minutes - 2) * 2) + $totalMinutes;
                $prixPlaceTTC =  $place->getPrixplace() + (($total30Minutes - 2) * 2) + $totalMinutes;
            }

            $prixPlaceHT = $prixPlaceTTC / (2 - $place->getTva()->getMultiplicate()) ;
            $tvaPlace = $prixPlaceTTC - $prixPlaceHT;
            $totalPlaceHT += $prixPlaceHT;

            if (!isset($commande['tvaPlace']['%'.$place->getTva()->getValeur()]))
                $commande['tvaPlace']['%'.$place->getTva()->getValeur()] = round($tvaPlace,2);
            else
                $commande['tvaPlace']['%'.$place->getTva()->getValeur()] += round($tvaPlace,2);

            $totalPlaceTVA += round($prixPlaceTTC - $prixPlaceHT,2);
            $commande['place'][$place->getIdplace()] = array(
                'reference' => $place->getNomplace(),
                'image' => $place->getImageSalle(),
                'heureDebut' => $panier_place[$place->getIdplace()]['heureChoixDebut'],
                'heureFin' => $panier_place[$place->getIdplace()]['heureChoixFin'],
                'date' => $panier_place[$place->getIdplace()]['date'],
                'heures' => $totaleHeuresR,
                'minutes' => $totaleMinutesR,
                'idReservation' => $panier_place[$place->getIdplace()]['idReservation'],
                'prixPlaceHT' => round($prixPlaceHT, 2),
                'prixHT' => round($place->getPrixplace(),2),
                'prixTTC' => round($prixPlaceTTC,2),
            );
        }

        // Pourquoi j'ai ajouté livraison ? useless ><
        $commande['livraison'] = array('prenom' => $livraison->getPrenom(),
            'nom' => $livraison->getNom(),
            'telephone' => $livraison->getTelephone(),
            'adresse' => $livraison->getAdresse(),
            'cp'=> $livraison->getCp(),
            'ville' => $livraison->getVille(),
            'pays' => $livraison->getPays(),
            'complement' => $livraison->getComplement()
        );

        $commande['facturation'] = array(
            'prenom' => $facturation->getPrenom(),
            'nom' => $facturation->getNom(),
            'telephone' => $facturation->getTelephone(),
            'adresse' => $facturation->getAdresse(),
            'cp' => $facturation->getCp(),
            'ville' => $facturation->getVille(),
            'pays' => $facturation->getPays(),
            'complement' => $facturation->getComplement(),
            'vatnumber' => $facturation->getVatNumber()
        );

        $commande['prixHT'] = round($totalHT,2);
        $commande['prixTTC'] = round($totalHT + $totalTVA,2);
        $commande['prixSalleHT'] = round($totalSalleHT,2);
        $commande['prixSalleTTC'] = round($totalSalleTTC,2);
        $commande['prixPlaceHT'] = round($totalPlaceHT,2);
        $commande['prixPlaceTTC'] = round($totalPlaceTTC,2);

        // On vérifie encore si le VAT est valide et en cours de validité
        $validator = $this->get('ddeboer_vatin.vatin_validator');
        $reduction10 = 0;
        if( (count($places) + count($salles)) > 0 && count($produits) > 0){
            $reduction10 = round((($totalHT + $totalTVA) + $totalSalleTTC + $totalPlaceTTC) * 0.1, 2);
            $commande['reduction10'] = round($reduction10, 2);
        }
        if($validator->isValid($facturation->getVatNumber(), true) ){
            $commande['VATtotalTVA'] = $totalTVA + $totalSalleTVA;
            //TotalTTC sans la TVA
            $commande['totalTTC'] = round(($commande['prixTTC'] + $commande['prixSalleTTC'] + $commande['prixPlaceTTC'] - $totalTVA - $totalSalleTVA - $totalPlaceTVA - $reduction10), 2);
        }else {
            $commande['totalTTC'] = round(($commande['prixTTC'] + $commande['prixSalleTTC'] + $commande['prixPlaceTTC'] - $reduction10), 2);
        }
        $commande['token'] = bin2hex(random_bytes(20));
        $commande['thirdHourFree'] = round($thirdHourFree, 2);

        return $commande;
    }

    /**
     * @param SessionInterface $session
     * @return Response
     */
    public function prepareCommandeAction(SessionInterface $session)
    {

        $em = $this->getDoctrine()->getManager();

        if (!$session->has('commande'))
            $commande = new Commande();
        else
            $commande = $em->getRepository('AppBundle:Commande')->find($session->get('commande'));

        $commande->setDatecommande(new \DateTime());
        $commande->setPersonne($this->container->get('security.token_storage')->getToken()->getUser());
        $commande->setValider(0);
        $commande->setReference(0);
        $commande->setCommande($this->facture($session));

        if (!$session->has('commande')) {
            $em->persist($commande);
            $session->set('commande',  $commande);
        }

        $em->flush();

        return new Response($commande->getIdcommande());
    }

    /**
     * Gestion du nombre de stock et envoie de mail si on arrive à <= 5 en stock sur les produits
     * @param SessionInterface $session
     */
    public function setStockProduits(SessionInterface $session){
        $panier = $session->get('panier');
        $em = $this->getDoctrine()->getManager();

        $produits = $em->getRepository('AppBundle:Produit')->findArray(array_keys($panier));
        $data = array();
        $data['message'] = "";
        /**
         * @var $produit \AppBundle\Entity\Produit
         */
        foreach($produits as $produit) {
            $produit->setQuantiteenstock($produit->getQuantiteenstock() - $panier[$produit->getIdproduit()]);
            if($produit->getQuantiteenstock() <= 5){
                $data['message'] .= "Alerte il n'y a plus bientôt quantité (".$produit->getQuantiteenstock().") pour le produit ".$produit->getNomproduit() . " IdPrdouit: ". $produit->getIdproduit() ."\n\n";

            }
        }
        if($data['message'] != "") {
            $data['subject'] = "[Alerte Stock] Quantité de certains produit bientôt épuisé";
            $this->sendEmail($data);
        }

        $em->flush();

    }
    /**
     * @Route("/api/banque/{id}", options={"expose"=true}, name="validationCommande", requirements={"id": "\d+"})
     * @Method({"GET", "POST"})
     * @param Request $request
     * @param SessionInterface $session
     * @param $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function validationCommandeAction(Request $request, SessionInterface $session, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $commande = $em->getRepository('AppBundle:Commande')->find($id);

        if (!$commande || $commande->getValider() == 1)
            throw $this->createNotFoundException('La commande n\'existe pas');

        $commande->setValider(1);
        $commande->setReference($this->get('set_new_reference')->reference()); //Service


        $this->setStockProduits($session);

        $retrieveCommande = $commande->getCommande();
        $personne = $em->getRepository('AppBundle:Personne')->find($this->getUser());
        $personne->setPointscumules($personne->getPointscumules()+(int)($retrieveCommande['totalTTC']/10) );

        $panier_salle = $session->get('panier_salle');
        $panier_place = $session->get('panier_place');
        if(reset($panier_salle)) {
            $key = key($panier_salle);
            $commande->setReservation($em->getRepository('AppBundle:Reservation')->find($panier_salle[$key]['idReservation']));
        }
        else if (reset($panier_place)){
            $key = key($panier_place);
            $commande->setReservation($em->getRepository('AppBundle:Reservation')->find($panier_place[$key]['idReservation']));
        }
        $em->flush();

        $session->remove('adresse');
        $session->remove('panier');
        $session->remove('panier_salle');
        $session->remove('panier_place');
        $session->remove('commande');

        //Ici le mail de validation
        $message = \Swift_Message::newInstance()
            ->setSubject('Validation de votre commande')
            ->setFrom(array('gustocoffee+official@gmail.com' => "GustoCoffee"))
            ->setTo($commande->getPersonne()->getEmailCanonical())
            ->setCharset('utf-8')
            ->setContentType('text/html')
            ->setBody($this->renderView(':SwiftLayout:validationCommande.html.twig',array('personne' => $commande->getPersonne())));

        $this->get('mailer')->send($message);

        $session->getFlashBag()->add('success','Votre commande est validé avec succès');
        return $this->redirect($this->generateUrl('factures'));
    }

    /**
     * @Route("/paiement/{id}", options={"expose"=true}, name="paiement_commande", requirements={"id": "\d+"})
     * @Method({"GET", "POST"})
     * @param Request $request
     * @param SessionInterface $session
     * @param $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function validationPaymentAction(Request $request, SessionInterface $session, $id){
        if ($request->getMethod() == 'POST' && $session->has('commande'))
        {
            $em = $this->getDoctrine()->getManager();
            $commande = $em->getRepository('AppBundle:Commande')->find($id);
            $co= $commande->getCommande();

           if ($request->get('token') == $co['token']){
               $baseURLPath = $request->getScheme() . '://' . $request->getHttpHost() . $this->container->get('router')->getContext()->getBaseUrl().'/'.$request->getLocale();
               $totalPrix = $request->request->get('totalTTC');

               /**
                * @var $this->getUser() \AppBundle\Entity\Personne
                */
               if($this->getUser()->getId()){
                   $customer_id = $this->getUser()->getId();
                   $email = $this->getUser()->getEmail();
               }else{
                   $customer_id = 'anon';
                   $email = "gustocoffee+official@gmail.com";
               }
               \Payplug\Payplug::setSecretKey('sk_test_44dfjjzLQ6f0S4xqYxGlQR');

               $amount = $totalPrix * 100; // En centime cf: la doc de Payplug

               $commande_id = $id;

               $payment = \Payplug\Payment::create(array(
                   'amount'           => (int)$amount,
                   'currency'         => 'EUR',
                   'customer'         => array(
                       'email'          => $email
                   ),
                   'hosted_payment'   => array(
                       'return_url'     => $baseURLPath.'/commande/api/banque/'.$commande_id,
                       'cancel_url'     => $baseURLPath.'/commande/paiement_commande/'.$commande_id
                   ),
                   'notification_url' =>  $baseURLPath.'/commande/notifications?id='.$commande_id,
                   'metadata'         => array(
                       'customer_id'    => (string)$customer_id
                   )
               ));

               $payment_url = $payment->hosted_payment->payment_url;

               //Todo: envoyer l'id payment ! somewhere
               return $this->redirect($payment_url);

           }else{
               // Token envoyé par l'user invalide !!
               $session->getFlashBag()->add('success','Le token de vérification de formulaire est invalide');
               return $this->redirect($this->generateUrl('validation_panier'));

           }

        }else{
            $session->getFlashBag()->add('error',"L'envoi de votre demande de validation a échoué");
            return $this->redirect($this->generateUrl('validation_panier'));
        }
    }

    /**
     * @Route("/ajaxpaiement/{id}", options={"expose"=true}, name="ajax_paiement_commande", requirements={"id": "\d+"})
     * @Method({"GET", "POST"})
     * @param Request $request
     * @param SessionInterface $session
     * @param $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function validationAjaxPaymentAction(Request $request, SessionInterface $session, $id){
        if ($request->getMethod() == 'POST' && $session->has('commande'))
        {
            $em = $this->getDoctrine()->getManager();
            $commande = $em->getRepository('AppBundle:Commande')->find($id);
            $co= $commande->getCommande();

            if ($request->request->get('token') == $co['token']){
                $baseURLPath = $request->getScheme() . '://' . $request->getHttpHost() . $this->container->get('router')->getContext()->getBaseUrl().'/'.$request->getLocale();

                $totalPrix = $request->request->get('totalTTC');

                /**
                 * @var $this->getUser() \AppBundle\Entity\Personne
                 */
                if($this->getUser()->getId()){
                    $customer_id = $this->getUser()->getId();
                    $email = $this->getUser()->getEmail();
                }else{
                    $customer_id = 'anon';
                }
                \Payplug\Payplug::setSecretKey('sk_test_44dfjjzLQ6f0S4xqYxGlQR');

                $amount = $totalPrix * 100; // En centime cf: la doc de Payplug
                $email = "gustocoffee+official@gmail.com";
                $commande_id = $id;

                $payment = \Payplug\Payment::create(array(
                    'amount'           => (int)$amount,
                    'currency'         => 'EUR',
                    'customer'         => array(
                        'email'          => $email
                    ),
                    'hosted_payment'   => array(
                        'return_url'     =>  $baseURLPath.'/commande/api/banque/'.$commande_id,
                        'cancel_url'     => $baseURLPath.'/commande/paiement_commande/'.$commande_id
                    ),
                    'notification_url' => $baseURLPath.'/commande/notifications?id='.$commande_id,
                    'metadata'         => array(
                        'customer_id'    => (string)$customer_id
                    )
                ));

                $payment_url = $payment->hosted_payment->payment_url;

                //Todo: envoyer l'id payment ! somewhere
                return new Response ($payment_url);

            }else{
                // Token envoyé par l'user invalide !!
                $session->getFlashBag()->add('success','Le token de vérification de formulaire est invalide');
                return $this->redirect($this->generateUrl('validation_panier'));

            }

        }else{
            $session->getFlashBag()->add('error',"L'envoi de votre demande de validation a échoué");
            return $this->redirect($this->generateUrl('validation_panier'));
        }
    }

    /**
     * @Route("/notifications/{id}", options={"expose"=true}, name="notifications_commande", requirements={"id": "\d+"})
     *
     */
    public function notificationPayplugAction(){

        $input = file_get_contents('php://input');
        try {
            $resource = \Payplug\Notification::treat($input);
            if ($resource instanceof \Payplug\Resource\Payment
                && $resource->is_paid) {
                $payment_id = $resource->id;
                $payment_state = $resource->is_paid;
                $payment_date = $resource->hosted_payment->paid_at;
                $payment_amount = $resource->amount;
                $payment_data = $resource->metadata[customer_id];
            }
        }
        catch (\Payplug\Exception\PayplugException $exception) {
            echo $exception;
        }
    }

    /**
     * Fonction utils d'envoie de mail pour les stocks mais aussi pour les points cumulés ? via cron ?
     * @param $data
     * @return int
     */
    private function sendEmail($data){
        $myappContactMail = $this->container->getParameter('mailer_user');
        $myappContactPassword = $this->container->getParameter('mailer_password');


        $transport = \Swift_SmtpTransport::newInstance('smtp.gmail.com', 465,'ssl')->setUsername($myappContactMail)->setPassword($myappContactPassword);

        $mailer = \Swift_Mailer::newInstance($transport);
        $message = \Swift_Message::newInstance($data["subject"])
            ->setFrom(array($myappContactMail => "Message by Automated Quantité des stocks"))
            ->setTo(array(
                $myappContactMail => $myappContactMail
            ))
            ->setBody($data["message"]."\n\n");

        return $mailer->send($message);

    }

}
