<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Place;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Place controller.
 *
 * @Route("place")
 */
class PlaceController extends Controller
{
    /**
     * Lists all place entities.
     *
     * @Route("/", name="place_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $places = $em->getRepository('AppBundle:Place')->findAll();

        return $this->render('place/index.html.twig', array(
            'places' => $places,
        ));
    }

    /**
     * Creates a new place entity.
     *
     * @Route("/new", name="place_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $place = new Place();
        $form = $this->createForm('AppBundle\Form\PlaceType', $place);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($place);
            $em->flush();

            return $this->redirectToRoute('place_show', array('idplace' => $place->getIdplace()));
        }

        return $this->render('place/new.html.twig', array(
            'place' => $place,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a place entity.
     *
     * @Route("/{idplace}", name="place_show")
     * @Method("GET")
     */
    public function showAction(Place $place)
    {
        $deleteForm = $this->createDeleteForm($place);

        return $this->render('place/show.html.twig', array(
            'place' => $place,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing place entity.
     *
     * @Route("/{idplace}/edit", name="place_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Place $place)
    {
        $deleteForm = $this->createDeleteForm($place);
        $editForm = $this->createForm('AppBundle\Form\PlaceType', $place);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('place_edit', array('idplace' => $place->getIdplace()));
        }

        return $this->render('place/edit.html.twig', array(
            'place' => $place,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a place entity.
     *
     * @Route("/{idplace}", name="place_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Place $place)
    {
        $form = $this->createDeleteForm($place);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($place);
            $em->flush();
        }

        return $this->redirectToRoute('place_index');
    }

    /**
     * Creates a form to delete a place entity.
     *
     * @param Place $place The place entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Place $place)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('place_delete', array('idplace' => $place->getIdplace())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
