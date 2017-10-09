<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Place;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;



/**
 * Place controller.
 * @RouteResource("Place")
 * @Route("place")
 */
class PlaceController extends FOSRestController
{
    /**
     *   @Operation(
     *     tags={""},
     *     summary="Retourne les places",
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
        $places = $em->getRepository('AppBundle:Place')->findAll();
        $view = $this->view($places);
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
        $place = $em->getRepository('AppBundle:Place')->find($id);
        $view = $this->view($place);
        return $view;
    }


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
     * @Route("/test", name="place_test")
     * $Method('GET')
     */
    public function testAction(){
        $j = 1;
        $c = 'A';
        $p = 1;
        for ($i = 1; $i <= 120; $i++) {
            if ($j > 10) {
                $c++;
                $p++;
                $j = 1;
            }
            echo $c . "_" .$j . "  position: ". $p."_". $j ." <br />\n\n";
            $j++;
        }
        return $this->render();
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
     * @Route("/{idplace}", name="place_show", requirements={"idplace": "\d+"})
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
     * @Route("/{idplace}/edit", name="place_edit", requirements={"idplace": "\d+"})
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
     * @Route("/{idplace}", name="place_delete", requirements={"idplace": "\d+"})
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

    /**
     * @Route("/map", options={"expose"=true}, name="ajax_places_map")
     * @Method({"GET", "POST"})
     * @return Response
     */
    public function ajaxGetMapPlacesAction()
    {
        $idsalle = 4; //get id openspace
        $em = $this->getDoctrine()->getManager();
        $places = $em->getRepository('AppBundle:Place')->getAllPositions($idsalle);

        $map = array();

        for ($i = 1 ; $i <= 12 ; $i++){
            $row = '' ;
            for ($j = 1 ; $j <= 10 ; $j++){
                if($j % 3 == 0  && $j != 1) {
                    $row .= '_';
                }
                $row .= 'p';
            }
            if ($i % 3 == 0){
                $vide = '' ;
                for($v = 1 ; $v <= 10 ; $v++){
                    $vide .= '_';
                }
                array_push($map, $vide);
            }
            array_push($map, $row);


        }

//        foreach($places as $place){
//            if($place['ligne'] == 10){
//
//            }
//        }

        //var_dump($places);

        return new Response(json_encode($map));
    }
}
