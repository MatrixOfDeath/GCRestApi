<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Magasin;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;

/**
 * Magasin controller.
 * @Rest\RouteResource("Magasin")
 * @Route("magasin")
 */
class MagasinController extends FOSRestController
{

    /**
     *   @Operation(
     *     tags={""},
     *     summary="Retourne les magasins",
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
        $place = $em->getRepository('AppBundle:Magasin')->findAll();
        $view = $this->view($place);
        return $view;
    }

    /**
     * Lists all magasin entities.
     *
     * @Route("/", name="magasin_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $magasins = $em->getRepository('AppBundle:Magasin')->findAll();

        return $this->render('magasin/index.html.twig', array(
            'magasins' => $magasins,
        ));
    }

    /**
     * Creates a new magasin entity.
     *
     * @Route("/new", name="magasin_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $magasin = new Magasin();
        $form = $this->createForm('AppBundle\Form\MagasinType', $magasin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($magasin);
            $em->flush();

            return $this->redirectToRoute('magasin_show', array('idmagasin' => $magasin->getIdmagasin()));
        }

        return $this->render('magasin/new.html.twig', array(
            'magasin' => $magasin,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a magasin entity.
     *
     * @Route("/{idmagasin}", name="magasin_show")
     * @Method("GET")
     */
    public function showAction(Magasin $magasin)
    {
        $deleteForm = $this->createDeleteForm($magasin);

        return $this->render('magasin/show.html.twig', array(
            'magasin' => $magasin,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing magasin entity.
     *
     * @Route("/{idmagasin}/edit", name="magasin_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Magasin $magasin)
    {
        $deleteForm = $this->createDeleteForm($magasin);
        $editForm = $this->createForm('AppBundle\Form\MagasinType', $magasin);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('magasin_edit', array('idmagasin' => $magasin->getIdmagasin()));
        }

        return $this->render('magasin/edit.html.twig', array(
            'magasin' => $magasin,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a magasin entity.
     *
     * @Route("/{idmagasin}", name="magasin_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Magasin $magasin)
    {
        $form = $this->createDeleteForm($magasin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($magasin);
            $em->flush();
        }

        return $this->redirectToRoute('magasin_index');
    }

    /**
     * Creates a form to delete a magasin entity.
     *
     * @param Magasin $magasin The magasin entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Magasin $magasin)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('magasin_delete', array('idmagasin' => $magasin->getIdmagasin())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
