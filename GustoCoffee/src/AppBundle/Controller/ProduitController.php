<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Produit;
use AppBundle\Entity\TypeDeProduit;
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
    public function ajaxIndexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $produits = $em->getRepository('AppBundle:Produit')->findAll();
        $salles = $em->getRepository('AppBundle:Salle')->findAll();

        $htmlToRender = $this->renderView('produit/ajaxproduits.html.twig', array(
            'produits' => $produits,
            'salles' => $salles,
        ));

        return new Response ($htmlToRender);

    }

    /**
     * Creates a new produit entity.
     *
     * @Route("/new", name="produit_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $produit = new Produit();
        $form = $this->createForm('AppBundle\Form\ProduitType', $produit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($produit);
            $em->flush();

            return $this->redirectToRoute('produit_show', array('idproduit' => $produit->getIdproduit()));
        }

        return $this->render('produit/new.html.twig', array(
            'produit' => $produit,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a produit entity.
     *
     * @Route("/{idproduit}", name="produit_show", requirements={"idproduit": "\d+"})
     * @Method("GET")
     */
    public function showAction(Produit $produit)
    {
        $deleteForm = $this->createDeleteForm($produit);

        return $this->render('produit/show.html.twig', array(
            'produit' => $produit,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing produit entity.
     *
     * @Route("/{idproduit}/edit", name="produit_edit", requirements={"idproduit": "\d+"})
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Produit $produit)
    {
        $deleteForm = $this->createDeleteForm($produit);
        $editForm = $this->createForm('AppBundle\Form\ProduitType', $produit);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('produit_edit', array('idproduit' => $produit->getIdproduit()));
        }

        return $this->render('produit/edit.html.twig', array(
            'produit' => $produit,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a produit entity.
     *
     * @Route("/{idproduit}", name="produit_delete", requirements={"idproduit": "\d+"})
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Produit $produit)
    {
        $form = $this->createDeleteForm($produit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($produit);
            $em->flush();
        }

        return $this->redirectToRoute('produit_index');
    }

    /**
     * Creates a form to delete a produit entity.
     *
     * @param Produit $produit The produit entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Produit $produit)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('produit_delete', array('idproduit' => $produit->getIdproduit())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }

    /**
     * @Route("/produits", name="produits_index")
     * @param SessionInterface $session
     * @param TypeDeProduit|null $categorie
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function produitsAction(SessionInterface $session, Request $request, TypeDeProduit $categorie = null)
    {
        //$session = $this->getRequest()->getSession();
        $em = $this->getDoctrine()->getManager();

        if ($categorie != null)
            $findProduits = $em->getRepository('AppBundle:Produit')->byCategorie($categorie);
        else
            //Todo: Géré le statut produit après !
            // $findProduits = $em->getRepository('AppBundle:Produit')->findBy(array('disponible' => 1));
            $findProduits = $em->getRepository('AppBundle:Produit')->findAll();

        if ($session->has('panier'))
            $panier = $session->get('panier');
        else
            $panier = false;

        //$produits = $this->get('knp_paginator')->paginate($findProduits,$this->get('request')->query->get('page', 1),3);
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
        //$session = $this->getRequest()->getSession();
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

//    public function rechercheAction()
//    {
//        $form = $this->createForm(new RechercheType());
//        return $this->render('EcommerceBundle:Default:Recherche/modulesUsed/recherche.html.twig', array('form' => $form->createView()));
//    }
//
//    public function rechercheTraitementAction()
//    {
//        $form = $this->createForm(new RechercheType());
//
//        if ($this->get('request')->getMethod() == 'POST')
//        {
//            $form->bind($this->get('request'));
//            $em = $this->getDoctrine()->getManager();
//            $produits = $em->getRepository('EcommerceBundle:Produits')->recherche($form['recherche']->getData());
//        } else {
//            throw $this->createNotFoundException('La page n\'existe pas.');
//        }
//
//        return $this->render('EcommerceBundle:Default:produits/layout/produits.html.twig', array('produits' => $produits));
//    }

}
