<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Facture;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * Facture controller.
 * @RouteResource("Facture")
 * @Route("facture")
 */
class FactureController extends FOSRestController
{
    /**
     * Lists all facture entities.
     *
     * @Route("/", name="facture_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $factures = $em->getRepository('AppBundle:Facture')->findAll();

        return $this->render('facture/index.html.twig', array(
            'factures' => $factures,
        ));
    }

    /**
     * Creates a new facture entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/new", name="facture_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $facture = new Facture();
        $form = $this->createForm('AppBundle\Form\Type\FactureType', $facture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($facture);
            $em->flush();

            return $this->redirectToRoute('facture_show', array('idfacture' => $facture->getIdfacture()));
        }

        return $this->render('facture/new.html.twig', array(
            'facture' => $facture,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a facture entity.
     *
     * @Route("/{idfacture}", name="facture_show", requirements={"idfacture": "\d+"})
     * @Method("GET")
     */
    public function showAction(Facture $facture)
    {
        $deleteForm = $this->createDeleteForm($facture);

        return $this->render('facture/show.html.twig', array(
            'facture' => $facture,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing facture entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idfacture}/edit", name="facture_edit", requirements={"idfacture": "\d+"})
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Facture $facture)
    {
        $deleteForm = $this->createDeleteForm($facture);
        $editForm = $this->createForm('AppBundle\Form\Type\FactureType', $facture);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('facture_edit', array('idfacture' => $facture->getIdfacture()));
        }

        return $this->render('facture/edit.html.twig', array(
            'facture' => $facture,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a facture entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idfacture}", name="facture_delete", requirements={"idfacture": "\d+"})
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Facture $facture)
    {
        $form = $this->createDeleteForm($facture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($facture);
            $em->flush();
        }

        return $this->redirectToRoute('facture_index');
    }

    /**
     * Creates a form to delete a facture entity.
     *
     * @param Facture $facture The facture entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Facture $facture)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('facture_delete', array('idfacture' => $facture->getIdfacture())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }

    /**
     * @Route("/factures", name="factures")
     * @return Response
     */
    public function facturesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $factures = $em->getRepository('AppBundle:Commande')->byFacture($this->getUser());

        return $this->render('facture/facture.html.twig', array('factures' => $factures));
    }

    /**
     * @Route("/lastfactures" , name="lastFactures")
     * @return Response
     */
    public function lastFacturesAction(){
        $em = $this->getDoctrine()->getManager();
        $factures = $em->getRepository('AppBundle:Commande')->byLastFacture($this->getUser());

        return $this->render('facture/lastFactures.html.twig', array('factures' => $factures));
    }

    /**
     * @Route("/PDF/{id}", name="facturesPDF", requirements={"id": "\d+"})
     * @param $id
     * @return Response|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function facturesPDFAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $facture = $em->getRepository('AppBundle:Commande')->findOneBy(array('personnes' => $this->getUser(),
            'valider' => 1,
            'idcommande' => $id));

        if (!$facture) {
            $this->get('session')->getFlashBag()->add('error', 'Une erreur est survenue');
            return $this->redirect($this->generateUrl('factures'));
        }

        $this->container->get('set_new_facture')->facture($facture)->Output('Facture.pdf');

        $response = new Response();
        $response->headers->set('Content-type' , 'application/pdf');

        return $response;
    }

}

