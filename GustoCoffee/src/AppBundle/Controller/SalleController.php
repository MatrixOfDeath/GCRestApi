<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Salle;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use FOS\RestBundle\Controller\Annotations\Get;

/**
 * Salle controller.
 * @Rest\RouteResource("Salle")
 * @Route("salle")
 */
class SalleController extends FOSRestController
{


    /**
     * Cette fonction retourne toutes les salles
     *
     * @Operation(
     *     tags={""},
     *     summary="Retourne les salles",
     *     @SWG\Response(
     *         response="200",
     *         description="Returned when successful"
     *     )
     * )
     *
     *
     * @return array
     */
    public function cgetAction(){
        $em = $this->getDoctrine()->getManager();

        $salles= $em->getRepository('AppBundle:Salle')->findAll();

        $view = $this->view($salles);
        return $view;
    }

    /**
     * On retourne les informatinos d'une salle en fonction de l'id
     * @param $id
     * @return \FOS\RestBundle\View\View
     */
    public function getAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $salle = $em->getRepository('AppBundle:Salle')->find($id);
        $view = $this->view($salle);
        return $view;
    }

    /**
     * Lists all salle entities.
     *
     * @Route("/", name="salle_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $salles = $em->getRepository('AppBundle:Salle')->findAll();

        return $this->render('salle/index.html.twig', array(
            'salles' => $salles,
        ));
    }

    /**
     * Creates a new salle entity.
     *
     * @Route("/new", name="salle_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $salle = new Salle();
        $form = $this->createForm('AppBundle\Form\SalleType', $salle);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($salle);
            $em->flush();

            return $this->redirectToRoute('salle_show', array('idsalle' => $salle->getIdsalle()));
        }

        return $this->render('salle/new.html.twig', array(
            'salle' => $salle,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a salle entity.
     *
     * @Route("/{idsalle}", name="salle_show")
     * @Method("GET")
     */
    public function showAction(Salle $salle)
    {
        $deleteForm = $this->createDeleteForm($salle);

        return $this->render('salle/show.html.twig', array(
            'salle' => $salle,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing salle entity.
     *
     * @Route("/{idsalle}/edit", name="salle_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Salle $salle)
    {
        $deleteForm = $this->createDeleteForm($salle);
        $editForm = $this->createForm('AppBundle\Form\SalleType', $salle);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('salle_edit', array('idsalle' => $salle->getIdsalle()));
        }

        return $this->render('salle/edit.html.twig', array(
            'salle' => $salle,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a salle entity.
     *
     * @Route("/{idsalle}", name="salle_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Salle $salle)
    {
        $form = $this->createDeleteForm($salle);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($salle);
            $em->flush();
        }

        return $this->redirectToRoute('salle_index');
    }

    /**
     * Creates a form to delete a salle entity.
     *
     * @param Salle $salle The salle entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Salle $salle)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('salle_delete', array('idsalle' => $salle->getIdsalle())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
