<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
//use AppBundle\Form\PersonneType;
use AppBundle\Entity\Personne;
use AppBundle\Entity\Reservation;

/**
 * Panier controller.
 *
 * @Route("panier")
 */
class PanierController extends Controller
{
    /**
     * @param SessionInterface $session
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function menuAction(SessionInterface $session)
    {
        if (!$session->has('panier'))
            $articles = 0;
        else
            $articles = count($session->get('panier'));

        if (!$session->has('panier_salle'))
            $nbsalles = 0;
        else
            $nbsalles = count($session->get('panier_salle'));

        if (!$session->has('totalTTC'))
            $totalTTC = 0;
        else
            $totalTTC = $session->get('totalTTC');


        return $this->render('panier/panier.html.twig', array(
            'articles' => $articles,
            'salles' => $nbsalles,
            'totalTTC' => $totalTTC
        ));
    }

    /**
     * Index panier session.
     *
     * @param SessionInterface $session
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/", name="panier")
     * @Method({"GET", "POST"})
     */
    public function panierAction(SessionInterface $session)
    {
        if (!$session->has('panier')) $session->set('panier', array());
        if (!$session->has('panier_salle')) $session->set('panier_salle', array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));
        if (!$session->has('totalTTC')) $session->set('totalTTC', 0);

        $em = $this->getDoctrine()->getManager();
        $produits = $em->getRepository('AppBundle:Produit')->findArray(array_keys($session->get('panier')));
        $salles = $em->getRepository('AppBundle:Salle')->findArray(array_keys($session->get('panier_salle')));

        return $this->render('panier/layout/panier.html.twig', array(
            'produits' => $produits,
            'salles' => $salles,
            'panier' => $session->get('panier'),
            'panier_salle' => $session->get('panier_salle'),
        ));
    }

    /**
     * Index panier session.
     *
     * @param SessionInterface $session
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/ajax-panier", options={"expose"=true}, name="panier_ajax")
     * @Method({"GET", "POST"})
     */
    public function ajaxPanierAction(SessionInterface $session)
    {
        if (!$session->has('panier')) $session->set('panier', array());
        if (!$session->has('panier_salle')) $session->set('panier_salle', array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));
        if (!$session->has('totalTTC')) $session->set('totalTTC', 0);

        $em = $this->getDoctrine()->getManager();
        $produits = $em->getRepository('AppBundle:Produit')->findArray(array_keys($session->get('panier')));
        $salles = $em->getRepository('AppBundle:Salle')->findArray(array_keys($session->get('panier_salle')));

        $htmlToRender = $this->renderView('panier/layout/ajaxpanier.html.twig', array(
            'produits' => $produits,
            'salles' => $salles,
            'panier' => $session->get('panier'),
            'panier_salle' => $session->get('panier_salle'),
        ));

        return new Response ($htmlToRender);
    }

    /**
     * Delete panier session.
     *
     * @Route("/delete/{id}", name="delete_panier")
     * @Method({"GET", "POST"})
     */
    public function supprimerAction(SessionInterface $session, $id)
    {
        $panier = $session->get('panier');

        if (array_key_exists($id, $panier))
        {
            unset($panier[$id]);
            $session->set('panier',$panier);
            $this->get('session')->getFlashBag()->add('success','Article supprimé avec succès');
        }

        return $this->redirect($this->generateUrl('panier')); 
    }

    /**
     * Delete panier session.
     *
     * @Route("/ajax-delete",  options={"expose"=true}, name="ajax_delete_panier")
     * @Method({"GET", "POST"})
     */
    public function ajaxSupprimerAction(Request $request, SessionInterface $session)
    {
        $panier = $session->get('panier');
        $id = $request->request->get('id');
        if (array_key_exists($id, $panier))
        {
            unset($panier[$id]);
            $session->set('panier',$panier);
            $this->get('session')->getFlashBag()->add('success','Article supprimé avec succès');
            return new Response(json_encode("Sucess"));
        }else{
            $this->get('session')->getFlashBag()->add('nodfound','Article déjà supprimé');
            return new Response(json_encode("Produit not found"));
        }

        //return $this->redirect($this->generateUrl('panier'));
    }


    /**
     * Delete panier salle session.
     *
     * @Route("/delete-salle/{id}", name="delete_panier_salle")
     * @Method({"GET", "POST"})
     */
    public function supprimerSalleAction(SessionInterface $session, $id)
    {
        $panier_salle = $session->get('panier_salle');

        if (array_key_exists($id, $panier_salle))
        {
            unset($panier_salle[$id]);
            $session->set('panier_salle',$panier_salle);
            $this->get('session')->getFlashBag()->add('success','Salle supprimé avec succès');
        }
        return $this->redirect($this->generateUrl('panier'));
    }


    /**
     * Delete panier_salle session.
     *
     * @Route("/ajax-delete-salle", options={"expose"=true}, name="ajax_delete_panier_salle")
     * @Method({"GET", "POST"})
     */
    public function ajaxSupprimerSalleAction(Request $request, SessionInterface $session)
    {
        $panier_salle = $session->get('panier_salle');
        $id = $request->request->get('idsalle');
        if (array_key_exists($id, $panier_salle))
        {
            $em = $this->getDoctrine()->getManager();

            $reservation = $em->getRepository('AppBundle:Reservation')->find((int)$panier_salle[$id]['idReservation']);
            $em->remove($reservation);
            $em->flush();
            unset($panier_salle[$id]);
            $session->set('panier_salle',$panier_salle);
            $this->get('session')->getFlashBag()->add('success','Article supprimé avec succès');
            return new Response(json_encode("Success"));
        }else{
            $this->get('session')->getFlashBag()->add('nodfound','Article déjà supprimé');
            return new Response(json_encode("Produit not found"));
        }
    }

    /**
     * Ajout panier session.
     * @param SessionInterface $session
     * @param Request $request
     * @param $id
     * @return RedirectResponse
     * @Route("/ajouter/{id}", name="ajout_panier")
     * @Method("GET")
     */
    public function ajouterAction(SessionInterface $session, Request $request, $id)
    {
        if (!$session->has('panier')) $session->set('panier',array());

        $panier = $session->get('panier');


        if (array_key_exists($id, $panier)) {
            if ($request->query->get('qte') != null) $panier[$id] = $request->query->get('qte');
            $session->getFlashBag()->add('success','Quantité modifié avec succès');
        } else {
            if ($request->query->get('qte') != null)
                $panier[$id] = $request->query->get('qte');
            else
                $panier[$id] = 1;
            
            $session->getFlashBag()->add('success','Article ajouté avec succès');
        }

        $session->set('panier',$panier);

        return $this->redirect($this->generateUrl('panier'));
    }

    /**
     * Ajout panier session.
     * @param SessionInterface $session
     * @param Request $request
     * @return RedirectResponse|Response
     * @Route("/ajouter-produit", options={"expose"=true}, name="ajax_ajout_produit_panier")
     * @Method({"POST","GET"})
     */
    public function ajaxAjouterProduitAction(SessionInterface $session, Request $request)
    {
        if (!$session->has('panier')) $session->set('panier',array());
        $panier = $session->get('panier');

        if($request->request->get('id')){
            $id = $request->request->get('id');
            if (array_key_exists($id, $panier)) {
                if ($request->request->get('qte') != null) $panier[$id] = $request->request->get('qte');
                $session->getFlashBag()->add('success','Quantité modifié avec succès');
            } else {
                if ($request->request->get('qte') != null)
                    $panier[$id] = $request->request->get('qte');
                else
                    $panier[$id] = 1;

                $session->getFlashBag()->add('success','Produit ajouté avec succès');
            }
            $session->set('panier',$panier);

            return new Response(json_encode("Success"));
        }else{
            return new Response(json_encode("Erreur"));
        }
    }

    /**
     * @param SessionInterface $session
     * @param Request $request
     * @return RedirectResponse|Response
     * @Route("/ajouter-salle", options={"expose"=true}, name="ajout_panier_salle")
     * @Method({"GET", "POST"})
     */
    public function ajaxAjouterSalleAction(SessionInterface $session, Request $request)
    {
        if (!$session->has('panier_salle')) $session->set('panier_salle',array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));
        $panier_salle = $session->get('panier_salle');
        if (!$session->has('panier')) $session->set('panier',array());
        $panier = $session->get('panier');

        if($request->request->get('heureChoixDebut') && $request->request->get('heureChoixFin') && $request->request->get('id')) {

            $heureChoixDebut = $request->request->get('heureChoixDebut');
            $heureChoixFin = $request->request->get('heureChoixFin');
            $id = $request->request->get('id');
            $date = $request->request->get('date');
            if ($date or $date == ""){
                $date = new \Datetime();
            }
            $d1 = new \DateTime($heureChoixDebut);
            $d2 = new \DateTime($heureChoixFin);
            $interval = $d1->diff($d2);


            if (array_key_exists($id, $panier_salle)) {
                $panier_salle[$id] = array(
                    'heureChoixDebut' => $heureChoixDebut,
                    'heureChoixFin' => $heureChoixFin,
                    'date' => $date,
                    'totalHeures' => $interval->h,
                    'totalMinutes' => $interval->i,
                    'idReservation' => $panier_salle[$id]['idReservation'],
//               'idReservation' => null,
//                'idCommande' => null
                );
                $session->getFlashBag()->add('success', 'Nombre d\'heure modifié avec succès');
            } else {
                $panier_salle[$id] = array(
                    'heureChoixDebut' => $heureChoixDebut,
                    'heureChoixFin' => $heureChoixFin,
                    'date' => $date,
                    'totalHeures' => $interval->h,
                    'totalMinutes' => $interval->i,
                    'idReservation' => null,
//                  'idCommande' => null
                );
                $session->getFlashBag()->add('success', 'Salle ajouté avec succès');

            }
            $session->set('panier_salle', $panier_salle);

            $responseResa = $this->addReservationFromSession($request, $session, $id);

            return new Response(json_encode("Success"));

        }else {
            return new Response(json_encode("Erreur"));

        }
    }

    /**
     * @param Request $request
     * @param SessionInterface $session
     * @param $idSalle
     * @return string
     */
    private function addReservationFromSession(Request $request, SessionInterface $session, $idSalle){

        if (!$session->has('panier_salle')) $session->set('panier_salle',array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));
        $panier_salle = $session->get('panier_salle');
//        if (!$session->has('panier')) $session->set('panier',array());
//        $panier = $session->get('panier');

        var_dump('in'); // todo:remove
        if( $panier_salle[$idSalle] && $panier_salle[$idSalle]['heureChoixDebut'] && $panier_salle[$idSalle]['heureChoixFin'] && $panier_salle[$idSalle]['date'] ) {

            var_dump('OK');// todo:remove
            $heureChoixDebut = $panier_salle[$idSalle]['heureChoixDebut'];
            $heureChoixFin = $panier_salle[$idSalle]['heureChoixFin'];
            $dateReservation = $panier_salle[$idSalle]['date'];

            if (array_key_exists($idSalle, $panier_salle)) {

                var_dump("La salle existe dans le panier idResa:".$panier_salle[$idSalle]['idReservation'].$heureChoixFin . $heureChoixFin . "zz");// todo:remove
                $em = $this->getDoctrine()->getManager();

                if (empty( $panier_salle[$idSalle]['idReservation'])) {

                    var_dump('On saisit la new resa');// todo:remove
                    $reservation = new Reservation();
                    $reservation->setHeuredebut(new \DateTime($heureChoixDebut));
                    $reservation->setHeurefin(new \DateTime($heureChoixFin));
                    $reservation->setDatereservation($dateReservation);
                    $reservation->setIdsalle($em->getRepository('AppBundle:Salle')->find((int)$idSalle));
                    $reservation->setIdpersonne($this->getUser());
                    $reservation->setRemarquereservation('Reservation auto session :test admin');
                    $reservation->setStatut(0); // Reservation non confirmé statut : Draft

                    $em->persist($reservation);
                    $em->flush();
                    $panier_salle[$idSalle]['idReservation'] = $reservation->getIdreservation();

                    $session->getFlashBag()->add('notice', 'Votre réservation sera valider uniquement après le paiement');
                    $session->set('panier_salle', $panier_salle);

                } else {

                    var_dump('On modifie la resa');// todo:remove
                    $reservation = $em->getRepository('AppBundle:Reservation')->find((int)$panier_salle[$idSalle]['idReservation']);
                    $reservation->setHeuredebut(new \DateTime($heureChoixDebut));
                    $reservation->setHeurefin(new \DateTime($heureChoixFin));
                    $reservation->setDatereservation($dateReservation);
                    $reservation->setRemarquereservation('Modification réservation auto session : test admin');
                    $em->persist($reservation);
                    $em->flush();
                }

                // On retourne l'id de la reservation
                return $reservation->getIdreservation()." Reservation enregistré idReservation:".$panier_salle[$idSalle]['idReservation'] ;
            }
            else{
                return "idSalle doesn't exist";
            }
        }else{
            return "Not enough information in session to add reservation";
        }
    }

    /**
     * Ajout de la commmande en bdd à partir de la session
     * @param Request $request
     * @param SessionInterface $session
     * @param $idProduit
     * @return string
     */
    private function addCommandeFromSession(Request $request, SessionInterface $session, $idProduit){

        if (!$session->has('panier_salle')) $session->set('panier_salle',array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));
        $panier_salle = $session->get('panier_salle');
        if (!$session->has('panier')) $session->set('panier',array());
        $panier = $session->get('panier');
        var_dump('in');
        if( $panier_salle[$idProduit] && $panier_salle[$idProduit]['heureChoixDebut'] && $panier_salle[$idProduit]['heureChoixFin'] && $panier_salle[$idProduit]['date'] ) {
            var_dump('OK');
            $heureChoixDebut = $panier_salle[$idProduit]['heureChoixDebut'];
            $heureChoixFin = $panier_salle[$idProduit]['heureChoixFin'];
            $dateReservation = $panier_salle[$idProduit]['date'];

            if (array_key_exists($idProduit, $panier_salle)) {
                var_dump('On saisit la resa');
                $em = $this->getDoctrine()->getManager();

                if (!$panier_salle[$idProduit]['idReservation']) {
                    $reservation = new Reservation();
                    $reservation->setHeuredebut(new \DateTime($heureChoixDebut));
                    $reservation->setHeurefin(new \DateTime($heureChoixFin));
                    $reservation->setDatereservation(new \DateTime($dateReservation));
                    $reservation->setIdsalle($em->getRepository('AppBundle:Salle')->find((int)$idProduit));
                    $reservation->setIdpersonne($this->getUser());
                    $reservation->setRemarquereservation('Reservation auto session :test admin');
                    $reservation->setStatut(0); // Reservation non confirmé statut : Draft

                    $em->persist($reservation);
                    $em->flush();
                    $panier_salle[$idProduit]['idReservation'] = $reservation->getIdreservation();

                    $session->getFlashBag()->add('notice', 'Votre réservation sera valider uniquement après le paiement');
                    $session->set('panier_salle', $panier_salle);

                } else {
                    var_dump('On modifie la resa');
                    $reservation = $em->getRepository('AppBundle:Reservation')->find((int)$panier_salle[$idProduit]['idReservation']);
                    $reservation->setHeuredebut($heureChoixDebut);
                    $reservation->setHeurefin($heureChoixFin);
                    $reservation->setDatereservation($dateReservation);
                    $reservation->setRemarquereservation('Modification réservation auto session : test admin');
                    $em->persist($reservation);
                    $em->flush();
                }

                // On retourne l'id de la reservation
                return "Reservation enregistré";
            }
            else{
                return "idSalle doesn't exist";
            }
        }else{
            return "Not enough information in session to add reservation";
        }
    }

    /**
     * Action panier session.
     *
     * @Route("/livraison/adresse/delete/{id}", name="delete_adresse_panier")
     * @Method({"GET", "POST"})
     */
    public function adresseSuppressionAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('AppBundle:Personne')->find($id);
        
        if ($this->container->get('security.token_storage')->getToken()->getUser() != $entity->getPersonne() || !$entity)
            return $this->redirect ($this->generateUrl ('livraison_panier'));
        
        $em->remove($entity);
        $em->flush();
        
        return $this->redirect ($this->generateUrl ('livraison_panier'));
    }

    /** TODO: Appeler cela une facturation
     *
     * @Route("/livraison", name="livraison_panier")
     * @Method({"GET", "POST"})
     */
    public function livraisonAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $utilisateur = $this->container->get('security.token_storage')->getToken()->getUser();
        //var_dump($utilisateur);  die();
        $personne = new Personne();
        $form = $this->createForm('AppBundle\Form\PersonneType', $utilisateur);
        
        if ($request->getMethod() == 'POST')
        {
            $form->handleRequest($request);
            if ($form->isValid()) {
                //$em = $this->getDoctrine()->getManager();
                //$personne->setPersonne($utilisateur);
                $em->persist($utilisateur);
                $em->flush();
                
                return $this->redirect($this->generateUrl('livraison_panier'));
            }
        }
        
        return $this->render('panier/layout/livraison.html.twig', array(
            'utilisateur' => $utilisateur,
            'form' => $form->createView()
        ));
    }

    /**
     * @return RedirectResponse
     */
    public function setLivraisonOnSession(Request $request, SessionInterface $session)
    {
        //$session = $this->getRequest()->getSession();
        
        if (!$session->has('adresse')) $session->set('adresse',array());
        $adresse = $session->get('adresse');
        
        if ($request->request->get('livraison') != null && $request->request->get('facturation') != null)
        {
            $adresse['livraison'] = $request->request->get('livraison');
            $adresse['facturation'] = $request->request->get('facturation');
        } else {
            return $this->redirect($this->generateUrl('validation_panier'));
        }
        
        $session->set('adresse',$adresse);
        return $this->redirect($this->generateUrl('validation_panier'));
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/validation", name="validation_panier")
     * @Method({"GET", "POST"})
     */
    public function validationAction(Request $request, SessionInterface $session)
    {
        if ($request->getMethod() == 'POST') {
            $this->setLivraisonOnSession($request, $session);
        }
        
        $em = $this->getDoctrine()->getManager();
        $prepareCommande = $this->forward('AppBundle:Commande:prepareCommande');
        $commande = $em->getRepository('AppBundle:Commande')->find($prepareCommande->getContent());
        
        return $this->render('panier/layout/validation.html.twig', array(
            'commande' => $commande
        ));
    }
}
