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
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public function indexAction(SessionInterface $session)
    {
        $em = $this->getDoctrine()->getManager();

        $places = $em->getRepository('AppBundle:Place')->findAll();

        if ($session->has('panier_place'))
            $panier_place = $session->get('panier_place');
        else
            $panier_place = false;

        $actualDate = new \DateTime(date('y-m-d H:i:s'));
        $plusOneHour = new \DateTime(date('y-m-d H:i:s', strtotime('+1 hour')));


        $dayofweek = $actualDate->format('N');
        $mag = $em->getRepository('AppBundle:Magasin')->find(1);
        $horaire = $em->getRepository('AppBundle:JoursOuvert')->find($dayofweek);

        // Si le magasin va fermé ou est fermé lors de l'affichage initiale !
        if($plusOneHour > $horaire->getHeurefin()->format('H:i') && $plusOneHour < $horaire->getHeuredebut()){
            // TODO: Reload next day morning !
            $placesDispoNow = null;
        }else {
            $placesDispoNow = $em->getRepository('AppBundle:Place')->checkDisponibilitePlace($actualDate->format('y-m-d H:i:s'), $plusOneHour->format('y-m-d H:i:s'));
        }

        return $this->render('place/index.html.twig', array(
            'places' => $placesDispoNow,
            'heureDebutChoix' => $actualDate->format('H'),
            'heureFinChoix' => $actualDate->add(new \DateInterval('PT1H'))->format('H'),
            'dateChoix' => $actualDate->format("d/m/Y"),
            'panier' => $panier_place,
            'minHeure' => $horaire->getHeuredebut()->format('H:i'),
            'maxHeure' => $horaire->getHeurefin()->format('H:i')
        ));
    }


    /**
     * TODO: change to salles_disponible_by_date
     * @Route("/disponible", options={"expose"=true}, name="places_disponible")
     * @Method({"GET", "POST"})
     */
    public function placesDisponibleAction(Request $request){
        $sallesDispo = null;

        if($request->request->get('heureChoixDebut') && $request->request->get('heureChoixFin') &&
            (new \DateTime($request->request->get('heureChoixDebut')))->format('Y-m-d H')  >= (new \DateTime())->format('Y-m-d H') ) {
            // On vérifie bien que la date et heure est inférieur à la date du jour en cas d'injection ou modificz

            $heureChoixDebut = $request->request->get('heureChoixDebut');
            $heureChoixFin = $request->request->get('heureChoixFin');

            $em = $this->getDoctrine()->getManager();
            $sallesDispo = $em->getRepository('AppBundle:Place')->checkDisponibilitePlace($heureChoixDebut, $heureChoixFin);
            //return new JsonResponse($sallesDispo);
            $htmlToRender = $this->renderView('place/placesDisponible.html.twig', array(
                'salles' => $sallesDispo,
                'heureDebutChoix' => (new \DateTime($heureChoixDebut))->format('H'),
                'heureFinChoix' => (new \DateTime($heureChoixFin))->format('H'),
                'dateChoix' => (new \DateTime($heureChoixDebut))->format('d/m/Y')
            ));
            return new Response ($htmlToRender);

        }else{
            return $this->render('place/placesDisponible.html.twig', array(
                'salles' => $sallesDispo,
            ));
        }
    }
    /**
     * Todo: Remove here because in repository
     * @param $heureChoixDebut
     * @param $heureChoixFin
     * @return mixed
     */
    public function checkDisponibilitePlace($heureChoixDebut, $heureChoixFin)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('AppBundle:Place');

        $subQuery = $repository->createQueryBuilder('p_sub')
            ->select('p_sub.idplace')
            ->leftJoin('p_sub.reservation', 'r')
            ->andwhere('r.heuredebut < :heureChoixDebut')
            ->andWhere('r.heurefin >= :heureChoixDebut OR r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut < :heureChoixFin AND r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut >= :heureChoixDebut AND r.heurefin <= :heureChoixFin');

        $queryBuilder = $repository->createQueryBuilder('p');

        $query = $queryBuilder
            ->where($queryBuilder->expr()->notIn('p.idplace', $subQuery->getDQL()))
//            ->andWhere(':heureChoixDebut < :datenow')
            //->setParameter('datenow', date("Y-m-d H:i:s"))
            ->setParameter('heureChoixDebut', $heureChoixDebut)
            ->setParameter('heureChoixFin', $heureChoixFin);
        //->setParameter('subQuery', $subQuery)
        //->getQuery();
        return $query->getQuery()->getResult();
    }

    /**
     * @Route("/disponible-ajax", options={"expose"=true}, name="places_disponible_ajax")
     * @Method({"GET", "POST"})
     */
    public function ajaxCheckDispoPlace(Request $request)
    {
        if($request->request->get('heureChoixDebut') && $request->request->get('heureChoixFin') && $request->request->get('idPlace') ) {
            $heureChoixDebut = $request->request->get('heureChoixDebut');
            $heureChoixFin = $request->request->get('heureChoixFin');

            $idPosition= $request->request->get('idPlace');

            $em = $this->getDoctrine()->getManager();
            $repository = $em->getRepository('AppBundle:Place');
            $idPlace = $repository->getByPosition($idPosition);

            $isDispo = $repository->checkIfPlaceDispo($heureChoixDebut, $heureChoixFin, $idPlace);

            return new Response(json_encode($isDispo));

        }else{
            return new Response(json_encode('Incorrect parameters'));
        }
    }

    /**
     * Todo: Remove because its in repo Place
     * Verification si une place est disponible selon un creneau horaire
     * @param $heureChoixDebut
     * @param $heureChoixFin
     * @param $idplace
     * @return mixed
     */
    public function checkIfPlaceDispo($heureChoixDebut, $heureChoixFin, $idplace)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('AppBundle:Place');

        $subQuery = $repository->createQueryBuilder('p_sub')
            ->select('p_sub.idplace')
            ->leftJoin('p_sub.reservation', 'r')
            ->andwhere('r.heuredebut < :heureChoixDebut')
            ->andWhere('r.heurefin >= :heureChoixDebut OR r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut < :heureChoixFin AND r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut >= :heureChoixDebut AND r.heurefin <= :heureChoixFin');

        $queryBuilder = $repository->createQueryBuilder('p');

        $query = $queryBuilder
            ->select('count(p.idplace)')
            ->where($queryBuilder->expr()->notIn('p.idplace', $subQuery->getDQL()))
            ->andWhere('p.idplace = :idplace')
//            ->andWhere(':heureChoixDebut < :datenow')
//            ->setParameter('datenow', date("Y-m-d H:i:s"))
            ->setParameter('idplace', $idplace)
            ->setParameter('heureChoixDebut', $heureChoixDebut)
            ->setParameter('heureChoixFin', $heureChoixFin);

        return $query->getQuery()->getSingleScalarResult();
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

        $positions = array_column($places, 'position');
        $line = 1;
        $car = 'A';
        $maxligne=12;
        $maxcolonne=10;
        for ($i = 1; $i <= $maxligne ; $i++){
            $row = '' ;
            $col = 1;
            for ($j = 1 ; $j <= $maxcolonne ; $j++){
                if($j % 3 == 0  && $j != 1) {
                    $row .= '_';
                    ++$col;
                }
                if(in_array('1_1', $positions))
                    $row .= 'p';
                else
                    $row .= 'f';
                //echo 'Name: '.$car.$col;
                //echo ' Position: '.$line.'_'.$col.'<br>';
                $col++;
            }
            if ($i % 3 == 0){
                $vide = '' ;
                for($v = 1 ; $v <= $maxcolonne ; $v++){
                    $vide .= '_';
                }
                $line++;
                $car++;
                array_push($map, $vide);
            }
            $car++;
            $line++;
            array_push($map, $row);
        }

        return new Response(json_encode($map));
    }
}
