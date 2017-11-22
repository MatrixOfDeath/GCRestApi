<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Produit;
use AppBundle\Entity\TypeDeProduit;
use AppBundle\Form\RechercheType;
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
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * Produit controller.
 * @Rest\RouteResource("Produit")
 * @Route("produit")
 */
class ProduitController extends FOSRestController
{

    /**
     *   @Operation(
     *     tags={""},
     *     summary="Retourne les produits",
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
        $place = $em->getRepository('AppBundle:Produit')->findAll();
        $view = $this->view($place);
        return $view;
    }

    /**
     * Lists all produit entities.
     *
     * @Route("/produit", name="produit_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $produits = $em->getRepository('AppBundle:Produit')->findAll();

        $salles = $em->getRepository('AppBundle:Salle')->findAll();

        return $this->render('produit/index.html.twig', array(
            'produits' => $produits,
            'salles' => $salles,
        ));
    }

    /**
     * @Route("/ajax-produit", options={"expose"=true}, name="produits_ajax")
     *
     * @Method({"GET", "POST"})
     */
    public function ajaxIndexAction(SessionInterface $session)
    {
        $em = $this->getDoctrine()->getManager();
        if (!$session->has('panier')) $session->set('panier', array());
        if (!$session->has('panier')) $session->set('panier_salle', array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));

        $produits = $em->getRepository('AppBundle:Produit')->findAll();
        $salles = $em->getRepository('AppBundle:Salle')->findAll();

        $htmlToRender = $this->renderView('produit/ajaxproduits.html.twig', array(
            'produits' => $produits,
            'panier' => $session->get('panier'),
            'salles' => $salles,
        ));

        return new Response ($htmlToRender);

    }

    /**
     * Finds and displays a produit entity.
     *
     * @Route("/{idproduit}", name="produit_show", requirements={"idproduit": "\d+"})
     * @Method("GET")
     */
    public function showAction(Produit $produit)
    {
        return $this->render('produit/show.html.twig', array(
            'produit' => $produit,
        ));
    }


    /**
     * @Route("/produits", name="produits_index")
     * @param SessionInterface $session
     * @param TypeDeProduit|null $categorie
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function produitsAction(SessionInterface $session, Request $request, TypeDeProduit $categorie = null)
    {
        $em = $this->getDoctrine()->getManager();

        if ($categorie !== null)
            $findProduits = $em->getRepository('AppBundle:Produit')->byCategorie($categorie);
        else
            //Todo: Géré le statut produit après !
            // $findProduits = $em->getRepository('AppBundle:Produit')->findBy(array('disponible' => 1));
            $findProduits = $em->getRepository('AppBundle:Produit')->findAll();

        if ($session->has('panier'))
            $panier = $session->get('panier');
        else
            $panier = false;

        $produits = $em->getRepository('AppBundle:Produit')->findAll();

        return $this->render('produit/produits.html.twig', array(
            'produits' => $produits,
            'panier' => $panier)
        );
    }

    /**
     * @Route("/presentation/{id}", name="presentation_produit", requirements={"id": "\d+"})
     * @param SessionInterface $session
     * @param $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function presentationAction(SessionInterface $session, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $produit = $em->getRepository('AppBundle:Produit')->find($id);

        if (!$produit) throw $this->createNotFoundException('La page n\'existe pas.');

        if ($session->has('panier'))
            $panier = $session->get('panier');
        else
            $panier = false;

        return $this->render('produit/presentation.html.twig', array(
            'produit' => $produit,
            'panier' => $panier));
    }

    /**
     * @Route("/recherche", name="recherche")
     * @return Response
     */
    public function rechercheAction()
    {
        $form = $this->createForm('AppBundle\Form\Type\RechercheType');
        return $this->render('produit/recherche.html.twig', array('form' => $form->createView()));
    }

    /**
     * @Route("/rechercheProduits", name="rechercheProduits")
     * @param Request $request
     * @return Response
     */
    public function rechercheTraitementAction(Request $request)
    {
        $form = $this->createForm('AppBundle\Form\Type\RechercheType');

        if ($request->getMethod() == 'POST')
        {
            $form->handleRequest($request);
            $em = $this->getDoctrine()->getManager();
            $produits = $em->getRepository('AppBundle:Produit')->recherche($form['recherche']->getData());
        } else {
            throw $this->createNotFoundException('La page n\'existe pas.');
        }

        return $this->render('produit/produits.html.twig', array('produits' => $produits));
    }

}
