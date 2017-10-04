<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Commande;
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
use AppBundle\Services\GetReference;

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
     *
     * @Route("/new", name="commande_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $commande = new Commande();
        $form = $this->createForm('AppBundle\Form\CommandeType', $commande);
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
     *
     * @Route("/{idcommande}/edit", name="commande_edit", requirements={"idcommande": "\d+"})
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Commande $commande)
    {
        $deleteForm = $this->createDeleteForm($commande);
        $editForm = $this->createForm('AppBundle\Form\CommandeType', $commande);
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
     *
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
     *
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
     * @param SessionInterface $session
     * @return array
     */
    public function facture(SessionInterface $session)
    {
        $em = $this->getDoctrine()->getManager();

        //$generator = $this->container->get('security.secure_random');
        //$session = $this->getRequest()->getSession();

        $adresse = $session->get('adresse');
        $panier = $session->get('panier');
        $panier_salle = $session->get('panier_salle');

        $commande = array();
        $totalHT = 0;
        $totalTVA = 0;
        $totalSalleHT = 0;
        $totalSalleTVA = 0;


        $facturation = $em->getRepository('AppBundle:UtilisateursAdresses')->find($adresse['facturation']);
        $livraison = $em->getRepository('AppBundle:UtilisateursAdresses')->find($adresse['livraison']);
        $produits = $em->getRepository('AppBundle:Produit')->findArray(array_keys($session->get('panier')));
        $salles =  $em->getRepository('AppBundle:Salle')->findArray(array_keys($session->get('panier_salle')));

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
                'prixHT' => round($produit->getPrixproduit(),2),
                'prixTTC' => round($produit->getPrixproduit() / $produit->getTva()->getMultiplicate(),2));
        }
        /**
         * fin de s'y retrouver IDE
         * @var $salle \AppBundle\Entity\Salle
         */
        foreach($salles as $salle)
        {
            $prixSalleHT = ($salle->getPrixsalle() * $panier_salle[$salle->getIdsalle()]['totalHeures']);
            $prixSalleTTC = ($salle->getPrixsalle() * $panier_salle[$salle->getIdsalle()]['totalHeures'] / $salle->getTva()->getMultiplicate());
            $totalSalleHT += $prixSalleHT;

            if (!isset($commande['tva']['%'.$salle->getTva()->getValeur()]))
                $commande['tva']['%'.$salle->getTva()->getValeur()] = round($prixSalleTTC - $prixSalleHT,2);
            else
                $commande['tva']['%'.$salle->getTva()->getValeur()] += round($prixSalleTTC - $prixSalleHT,2);

            $totalTVA += round($prixSalleTTC - $prixSalleTTC,2);

            $commande['salle'][$salle->getIdsalle()] = array('reference' => $salle->getNomsalle(),
                'quantite' => $panier_salle[$salle->getIdsalle()]['totalHeures'],
                'prixHT' => round($salle->getPrixsalle(),2),
                'prixTTC' => round($salle->getPrixsalle() / $salle->getTva()->getMultiplicate(),2));
        }

        $commande['livraison'] = array('prenom' => $livraison->getPrenom(),
            'nom' => $livraison->getNom(),
            'telephone' => $livraison->getTelephone(),
            'adresse' => $livraison->getAdresse());

        $commande['facturation'] = array('prenom' => $facturation->getPrenom(),
            'nom' => $facturation->getNom(),
            'telephone' => $facturation->getTelephone(),
            'adresse' => $facturation->getAdresse());

        $commande['prixHT'] = round($totalHT,2);
        $commande['prixTTC'] = round($totalHT + $totalTVA,2);
        $commande['prixSalleHT'] = round($totalSalleHT,2);
        $commande['prixSalleTTC'] = round($totalSalleHT + $totalSalleHT,2);
        $commande['token'] = bin2hex(random_bytes(20));

        return $commande;
    }

    /**
     * @param SessionInterface $session
     * @return Response
     */
    public function prepareCommandeAction(SessionInterface $session)
    {
        //$session = $this->getRequest()->getSession();
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
            $session->set('commande',$commande);
        }

        $em->flush();

        return new Response($commande->getIdcommande());
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
        /**
         * @var GetReference
         */
        $commande->setReference($this->get('set_new_reference')->reference()); //Service
        $em->flush();

        //$session = $this->getRequest()->getSession();
        $session->remove('adresse');
        $session->remove('panier');
        $session->remove('panier_salle');
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
        return $this->redirect($this->generateUrl('facture'));
    }
}
