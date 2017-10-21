<?php

namespace AppBundle\Controller;

use AppBundle\Entity\ModeDePaiement;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * Modedepaiement controller.
 * @Rest\RouteResource("ModeDePaiement")
 * @Route("modedepaiement")
 */
class ModeDePaiementController extends FOSRestController
{


    /**
     *   @Operation(
     *     tags={""},
     *     summary="Retourne les modes de paiements disponible",
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
        $place = $em->getRepository('AppBundle:ModeDePaiement')->findAll();
        $view = $this->view($place);
        return $view;
    }


    public function getModeDePaiementAction()
    {
        $em = $this->getDoctrine()->getManager();
        $modeDePaiements = $em->getRepository('AppBundle:ModeDePaiement')->findAll();
        $view = $this->view($modeDePaiements);
        return $view;
    }
    /**
     * Lists all modeDePaiement entities.
     *
     * @Route("/", name="modedepaiement_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $modeDePaiements = $em->getRepository('AppBundle:ModeDePaiement')->findAll();

        return $this->render('modedepaiement/index.html.twig', array(
            'modeDePaiements' => $modeDePaiements,
        ));
    }

    /**
     * Creates a new modeDePaiement entity.
     *
     * @Route("/new", name="modedepaiement_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $modeDePaiement = new Modedepaiement();
        $form = $this->createForm('AppBundle\Form\ModeDePaiementType', $modeDePaiement);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($modeDePaiement);
            $em->flush();

            return $this->redirectToRoute('modedepaiement_show', array('idmodepaiement' => $modeDePaiement->getIdmodepaiement()));
        }

        return $this->render('modedepaiement/new.html.twig', array(
            'modeDePaiement' => $modeDePaiement,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a modeDePaiement entity.
     *
     * @Route("/{idmodepaiement}", name="modedepaiement_show")
     * @Method("GET")
     */
    public function showAction(ModeDePaiement $modeDePaiement)
    {
        $deleteForm = $this->createDeleteForm($modeDePaiement);

        return $this->render('modedepaiement/show.html.twig', array(
            'modeDePaiement' => $modeDePaiement,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing modeDePaiement entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idmodepaiement}/edit", name="modedepaiement_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, ModeDePaiement $modeDePaiement)
    {
        $deleteForm = $this->createDeleteForm($modeDePaiement);
        $editForm = $this->createForm('AppBundle\Form\ModeDePaiementType', $modeDePaiement);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('modedepaiement_edit', array('idmodepaiement' => $modeDePaiement->getIdmodepaiement()));
        }

        return $this->render('modedepaiement/edit.html.twig', array(
            'modeDePaiement' => $modeDePaiement,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a modeDePaiement entity.
     * @Security("has_role('ROLE_ADMIN')")
     * @Route("/{idmodepaiement}", name="modedepaiement_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, ModeDePaiement $modeDePaiement)
    {
        $form = $this->createDeleteForm($modeDePaiement);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($modeDePaiement);
            $em->flush();
        }

        return $this->redirectToRoute('modedepaiement_index');
    }

    /**
     * Creates a form to delete a modeDePaiement entity.
     *
     * @param ModeDePaiement $modeDePaiement The modeDePaiement entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(ModeDePaiement $modeDePaiement)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('modedepaiement_delete', array('idmodepaiement' => $modeDePaiement->getIdmodepaiement())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
