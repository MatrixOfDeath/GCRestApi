<?php

namespace AppBundle\Controller;

use AppBundle\Entity\TypeDeProduit;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Typedeproduit controller.
 *
 * @Route("typedeproduit")
 */
class TypeDeProduitController extends Controller
{


    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     */
    public function menuAction()
    {
        $em = $this->getDoctrine()->getManager();
        $typeproduits = $em->getRepository('AppBundle:TypeDeProduit')->findAll();

        return $this->render('typedeproduit/menu.html.twig', array(
            'typeproduits' => $typeproduits)
        );
    }


    /**
     * Lists all typeDeProduit entities.
     *
     * @Route("/", name="typedeproduit_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $typeDeProduits = $em->getRepository('AppBundle:TypeDeProduit')->findAll();

        return $this->render('typedeproduit/index.html.twig', array(
            'typeDeProduits' => $typeDeProduits,
        ));
    }

    /**
     * Creates a new typeDeProduit entity.
     *
     * @Route("/new", name="typedeproduit_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $typeDeProduit = new Typedeproduit();
        $form = $this->createForm('AppBundle\Form\TypeDeProduitType', $typeDeProduit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($typeDeProduit);
            $em->flush();

            return $this->redirectToRoute('typedeproduit_show', array('idtypeproduit' => $typeDeProduit->getIdtypeproduit()));
        }

        return $this->render('typedeproduit/new.html.twig', array(
            'typeDeProduit' => $typeDeProduit,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a typeDeProduit entity.
     *
     * @Route("/{idtypeproduit}", name="typedeproduit_show")
     * @Method("GET")
     */
    public function showAction(TypeDeProduit $typeDeProduit)
    {
        $deleteForm = $this->createDeleteForm($typeDeProduit);

        return $this->render('typedeproduit/show.html.twig', array(
            'typeDeProduit' => $typeDeProduit,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing typeDeProduit entity.
     *
     * @Route("/{idtypeproduit}/edit", name="typedeproduit_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, TypeDeProduit $typeDeProduit)
    {
        $deleteForm = $this->createDeleteForm($typeDeProduit);
        $editForm = $this->createForm('AppBundle\Form\TypeDeProduitType', $typeDeProduit);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('typedeproduit_edit', array('idtypeproduit' => $typeDeProduit->getIdtypeproduit()));
        }

        return $this->render('typedeproduit/edit.html.twig', array(
            'typeDeProduit' => $typeDeProduit,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a typeDeProduit entity.
     *
     * @Route("/{idtypeproduit}", name="typedeproduit_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, TypeDeProduit $typeDeProduit)
    {
        $form = $this->createDeleteForm($typeDeProduit);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($typeDeProduit);
            $em->flush();
        }

        return $this->redirectToRoute('typedeproduit_index');
    }

    /**
     * Creates a form to delete a typeDeProduit entity.
     *
     * @param TypeDeProduit $typeDeProduit The typeDeProduit entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(TypeDeProduit $typeDeProduit)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('typedeproduit_delete', array('idtypeproduit' => $typeDeProduit->getIdtypeproduit())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
