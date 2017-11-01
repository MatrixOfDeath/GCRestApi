<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Annonce;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * Annonce controller.
 * @Rest\RouteResource("Annonce")
 * @Route("annonce")
 */
class AnnonceController extends FOSRestController
{

    /**
     * Cette fonction retourne tous les annonces
     *
     * @Operation(
     *     tags={""},
     *     summary="Retourne les annonces",
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

        $annonces = $em->getRepository('AppBundle:Annonce')->findAll();

        $view = $this->view($annonces);
        return $view;
    }

    /**
     * On retourne les informatinos d'une annonce en fonction de l'id
     * @param $id
     * @return \FOS\RestBundle\View\View
     */
    public function getAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $annonce = $em->getRepository('AppBundle:Annonce')->find($id);
        $view = $this->view($annonce);
        return $view;
    }

    /**
     * Lists all annonce entities.
     * @Route("/", name="annonce_index")
     * @Method({"GET", "POST"})
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $annonces = $em->getRepository('AppBundle:Annonce')->findAll();

        $annonce = new Annonce();
        $form = $this->createForm('AppBundle\Form\Type\AnnonceType', $annonce);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            //Je set la date à la création de l'entité todo: edit date si on a le temps

            $annonce->setIdpersonne($this->getUser());
            $em->persist($annonce);
            $em->flush();

            return $this->redirectToRoute('annonce_show', array('idannonce' => $annonce->getIdannonce()));
        }


        return $this->render('annonce/index.html.twig', array(
            'annonces' => $annonces,
            'form' => $form->createView(),
        ));

    }

    /**
     * Creates a new annonce entity.
     * @Security("is_granted('ROLE_USER')")
     * @Route("/new", name="annonce_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $annonce = new Annonce();
        $form = $this->createForm('AppBundle\Form\Type\AnnonceType', $annonce);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $em->persist($annonce);
            $em->flush();

            return $this->redirectToRoute('annonce_show', array(
                'idannonce' => $annonce->getIdannonce(),
            ));
        }


        return $this->render('annonce/index.html.twig', array(
            'annonce' => $annonce,
            'form' => $form->createView(),


        ));
    }

    /**
     * Finds and displays a annonce entity.
     *
     * @Route("/{idannonce}", name="annonce_show", requirements={"idannonce": "\d+"})
     * @Method("GET")
     */
    public function showAction(Annonce $annonce)
    {
        $deleteForm = $this->createDeleteForm($annonce);

        return $this->render('annonce/show.html.twig', array(
            'annonce' => $annonce,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing annonce entity.
     * @Security("is_granted('ROLE_USER')")
     * @Route("/{idannonce}/edit", name="annonce_edit", requirements={"idannonce": "\d+"})
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Annonce $annonce)
    {
        $deleteForm = $this->createDeleteForm($annonce);
        $editForm = $this->createForm('AppBundle\Form\Type\AnnonceType', $annonce);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('annonce_edit', array('idannonce' => $annonce->getIdannonce()));
        }

        return $this->render('annonce/edit.html.twig', array(
            'annonce' => $annonce,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a annonce entity.
     * @Security("is_granted('ROLE_ADMIN')")
     * @Route("/{idannonce}", name="annonce_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Annonce $annonce)
    {
        $form = $this->createDeleteForm($annonce);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($annonce);
            $em->flush();
        }

        return $this->redirectToRoute('annonce_index');
    }

    /**
     * Creates a form to delete a annonce entity.
     * @Security("is_granted('ROLE_USER')")
     * @param Annonce $annonce The annonce entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Annonce $annonce)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('annonce_delete', array('idannonce' => $annonce->getIdannonce())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
