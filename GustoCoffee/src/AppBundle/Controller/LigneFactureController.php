<?php

namespace AppBundle\Controller;

use AppBundle\Entity\LigneFacture;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * Lignefacture controller.
 *
 * @Route("lignefacture")
 */
class LigneFactureController extends Controller
{
    /**
     * Lists all ligneFacture entities.
     *
     * @Route("/", name="lignefacture_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $ligneFactures = $em->getRepository('AppBundle:LigneFacture')->findAll();

        return $this->render('lignefacture/index.html.twig', array(
            'ligneFactures' => $ligneFactures,
        ));
    }

    /**
     * Creates a new ligneFacture entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/new", name="lignefacture_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $ligneFacture = new Lignefacture();
        $form = $this->createForm('AppBundle\Form\LigneFactureType', $ligneFacture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($ligneFacture);
            $em->flush();

            return $this->redirectToRoute('lignefacture_show', array('idlignefacture' => $ligneFacture->getIdlignefacture()));
        }

        return $this->render('lignefacture/new.html.twig', array(
            'ligneFacture' => $ligneFacture,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a ligneFacture entity.
     *
     * @Route("/{idlignefacture}", name="lignefacture_show")
     * @Method("GET")
     */
    public function showAction(LigneFacture $ligneFacture)
    {
        $deleteForm = $this->createDeleteForm($ligneFacture);

        return $this->render('lignefacture/show.html.twig', array(
            'ligneFacture' => $ligneFacture,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing ligneFacture entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idlignefacture}/edit", name="lignefacture_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, LigneFacture $ligneFacture)
    {
        $deleteForm = $this->createDeleteForm($ligneFacture);
        $editForm = $this->createForm('AppBundle\Form\LigneFactureType', $ligneFacture);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('lignefacture_edit', array('idlignefacture' => $ligneFacture->getIdlignefacture()));
        }

        return $this->render('lignefacture/edit.html.twig', array(
            'ligneFacture' => $ligneFacture,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a ligneFacture entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idlignefacture}", name="lignefacture_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, LigneFacture $ligneFacture)
    {
        $form = $this->createDeleteForm($ligneFacture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($ligneFacture);
            $em->flush();
        }

        return $this->redirectToRoute('lignefacture_index');
    }

    /**
     * Creates a form to delete a ligneFacture entity.
     *
     * @param LigneFacture $ligneFacture The ligneFacture entity
     * @Security("has_role('ROLE_ADMIN')")
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(LigneFacture $ligneFacture)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('lignefacture_delete', array('idlignefacture' => $ligneFacture->getIdlignefacture())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
