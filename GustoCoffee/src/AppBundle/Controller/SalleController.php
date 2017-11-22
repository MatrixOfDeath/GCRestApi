<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Salle;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

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
     *     tags={"Magasins, Salles et Places"},
     *     summary="Retourne les toutes les salles",
     *     @SWG\Response(
     *         response="200",
     *         description="Returned when successful"
     *     )
     * )
     *
     *
     * @return JsonResponse
     */
    public function cgetAction(){
        $em = $this->getDoctrine()->getManager();
        $salles= $em->getRepository('AppBundle:Salle')->findAll();

        //return $salles;
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
     * Lists all salles that are available from now to 1hour
     *
     * @Route("/reservation-private", name="salle_index")
     * @Method("GET")
     */
    public function indexAction(SessionInterface $session)
    {
        $em = $this->getDoctrine()->getManager();

        if ($session->has('panier_salle'))
            $panier_salle = $session->get('panier_salle');
        else
            $panier_salle = false;

        $actualDate = new \DateTime(date('y-m-d H:i:s'));
        $plusOneHour = new \DateTime(date('y-m-d H:i:s', strtotime('+1 hour')));


        $dayofweek = $actualDate->format('N');
        $mag = $em->getRepository('AppBundle:Magasin')->find(1);
        $horaire = $em->getRepository('AppBundle:JoursOuvert')->find($dayofweek);

        // Si le magasin va fermé ou est fermé lors de l'affichage initiale !
        if($plusOneHour > $horaire->getHeurefin()->format('H:i') && $plusOneHour < $horaire->getHeuredebut()){
            // TODO: Reload next day morning !
            $sallesDispoNow = null;
        }else {
            $sallesDispoNow = $this->checkDisponibiliteSalle($actualDate->format('y-m-d H:i:s'), $plusOneHour->format('y-m-d H:i:s'));
        }

        return $this->render('salle/index.html.twig', array(
            'salles' => $sallesDispoNow,
            'heureDebutChoix' => $actualDate->format('H'),
            'heureFinChoix' => $actualDate->add(new \DateInterval('PT1H'))->format('H'),
            'dateChoix' => $actualDate->format("d/m/Y"),
            'panier' => $panier_salle,
            'minHeure' => $horaire->getHeuredebut()->format('H:i'),
            'maxHeure' => $horaire->getHeurefin()->format('H:i')
        ));
    }

    /**
     * TODO: change to salles_disponible_by_date
     * @Route("/disponible", options={"expose"=true}, name="salles_disponible")
     * @Method({"GET", "POST"})
     */
    public function sallesDisponibleAction(Request $request){
        $sallesDispo = null;

        if($request->request->get('heureChoixDebut') && $request->request->get('heureChoixFin') &&
            (new \DateTime($request->request->get('heureChoixDebut')))->format('Y-m-d H')  >= (new \DateTime())->format('Y-m-d H') ) {
            // On vérifie bien que la date et heure est inférieur à la date du jour en cas d'injection ou modificz

            $heureChoixDebut = $request->request->get('heureChoixDebut');
            $heureChoixFin = $request->request->get('heureChoixFin');

            $sallesDispo = $this->checkDisponibiliteSalle($heureChoixDebut, $heureChoixFin);
            //return new JsonResponse($sallesDispo);
            $htmlToRender = $this->renderView('salle/sallesDisponible.html.twig', array(
                'salles' => $sallesDispo,
                'heureDebutChoix' => (new \DateTime($heureChoixDebut))->format('H'),
                'heureFinChoix' => (new \DateTime($heureChoixFin))->format('H'),
                'dateChoix' => (new \DateTime($heureChoixDebut))->format('d/m/Y')
            ));
            return new Response ($htmlToRender);

        }else{
            return $this->render('salle/sallesDisponible.html.twig', array(
                'salles' => $sallesDispo,

            ));
        }
    }

    /**
     * @Route("/disponible-ajax", options={"expose"=true}, name="salles_disponible_ajax")
     * @Method({"GET", "POST"})
     */
    public function ajaxCheckDispoSalleAction(Request $request)
    {
        if($request->request->get('heureChoixDebut') && $request->request->get('heureChoixFin') && $request->request->get('idSalle') ) {
            $heureChoixDebut = $request->request->get('heureChoixDebut');
            $heureChoixFin = $request->request->get('heureChoixFin');
            $idSalle = $request->request->get('idSalle');
            $isDispo = $this->checkIfSalleDispo($heureChoixDebut, $heureChoixFin, $idSalle);

            return new Response(json_encode($isDispo));

        }else{
            return new Response(json_encode('Incorrect parameters'));
        }
    }

    /**
     * Finds and displays a salle entity.
     *
     * @Route("/{idsalle}", name="salle_show", requirements={"idsalle": "\d+"})
     * @Method("GET")
     */
    public function showAction(Salle $salle, Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $produits = $em->getRepository('AppBundle:Produit')->findAll();

        return $this->render('salle/show.html.twig', array(
            'salle' => $salle,
            'produits' => $produits,
        ));
    }

    /**
     * Verification si une salle est disponible selon un creneau horaire
     * @param $heureChoixDebut
     * @param $heureChoixFin
     * @param $idsalle
     * @return mixed
     */
    private function checkIfSalleDispo($heureChoixDebut, $heureChoixFin, $idsalle)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('AppBundle:Salle');

        $subQuery = $repository->createQueryBuilder('s_sub')
            ->select('s_sub.idsalle')
            ->leftJoin('s_sub.reservation', 'r')
            ->andwhere('r.heuredebut < :heureChoixDebut')
            ->andWhere('r.heurefin >= :heureChoixDebut OR r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut < :heureChoixFin AND r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut >= :heureChoixDebut AND r.heurefin <= :heureChoixFin');

        $queryBuilder = $repository->createQueryBuilder('s');

        $query = $queryBuilder
            ->select('count(s.idsalle)')
            ->where($queryBuilder->expr()->notIn('s.idsalle', $subQuery->getDQL()))
            ->andWhere('s.idsalle = :idsalle')

            ->setParameter('idsalle', $idsalle)
            ->setParameter('heureChoixDebut', $heureChoixDebut)
            ->setParameter('heureChoixFin', $heureChoixFin);

        return $query->getQuery()->getSingleScalarResult();
    }

    /**
     * @param $heureChoixDebut
     * @param $heureChoixFin
     * @return mixed
     */
    private function checkDisponibiliteSalle($heureChoixDebut, $heureChoixFin)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('AppBundle:Salle');

        $subQuery = $repository->createQueryBuilder('s_sub')
            ->select('s_sub.idsalle')
            ->leftJoin('s_sub.reservation', 'r')
            ->andwhere('r.heuredebut < :heureChoixDebut')
            ->andWhere('r.heurefin > :heureChoixDebut OR r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut < :heureChoixFin AND r.heurefin >= :heureChoixFin')
            ->orWhere('r.heuredebut > :heureChoixDebut AND r.heurefin <= :heureChoixFin');


        $queryBuilder = $repository->createQueryBuilder('s');

        $query = $queryBuilder
            ->where($queryBuilder->expr()->notIn('s.idsalle', $subQuery->getDQL()))
//            ->andWhere(':heureChoixDebut < :datenow')
            //->setParameter('datenow', date("Y-m-d H:i:s"))
            ->setParameter('heureChoixDebut', $heureChoixDebut)
            ->setParameter('heureChoixFin', $heureChoixFin);

        return $query->getQuery()->getResult();
    }

    /**
     * @Route("/salles", name="salles_index")
     * @param SessionInterface $session
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function sallesAction(SessionInterface $session, Request $request)
    {

        $em = $this->getDoctrine()->getManager();

        $salles = $em->getRepository('AppBundle:Salle')->findAll();

        if ($session->has('panier_salle'))
            $panier_salle = $session->get('panier_salle');
        else
            $panier_salle = false;

        $salles = $em->getRepository('AppBundle:Salle')->findAll();

        return $this->render('produit/produits.html.twig', array(
                'salles' => $salles,
                'panier_salle' => $panier_salle)
        );
    }

    /**
     * @Route("/presentation/{id}", name="presentation_salle", requirements={"id": "\d+"})
     * @param SessionInterface $session
     * @param $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function presentationAction(SessionInterface $session, $id)
    {

        $em = $this->getDoctrine()->getManager();
        $salle= $em->getRepository('AppBundle:Salle')->find($id);

        if (!$salle) throw $this->createNotFoundException('La page n\'existe pas.');

        if ($session->has('panier_salle'))
            $panier_salle = $session->get('panier_salle');
        else
            $panier_salle = false;

        return $this->render('salle/presentation.html.twig', array(
            'salle' => $salle,
            'panier_salle' => $panier_salle)
        );
    }

}
