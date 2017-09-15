<?php

namespace GC\ReservationBundle\Controller;

use AppBundle\Entity\JoursOuvert;
use AppBundle\Entity\Reservation;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Validator\Constraints\DateTime;

class DefaultController extends Controller
{
    protected $dateReservation;
    protected $heureDebut;
    protected $heureFin;

    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('GCReservationBundle:Default:index.html.twig');
    }

    public function privateAction()
    {
        return $this->render('GCReservationBundle:Default:reservation-private.html.twig');
    }

    public function salleaAction(Request $request)
    {
        $reservation = new Reservation();
        $form = $this->createForm('AppBundle\Form\ReservationType', $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $dateReservation = $reservation->getDatereservation();
            print_r($dateReservation);
            $dateReservation->date;
            $dateReservationTimestamp = $dateReservation->getTimestamp();
            echo $dateReservationTimestamp;

            $heureDebut = $reservation->getHeuredebut();
            print_r($heureDebut);
            $heureDebut->date;
            $heureDebutTimestamp = $heureDebut->getTimestamp();
            echo $heureDebutTimestamp;

            $heureFin = $reservation->getHeurefin();
            print_r($heureFin);
            $heureFin->date;
            $heureFinTimestamp = $heureFin->getTimestamp();
            echo $heureFinTimestamp;

            $tempsReservation = ($heureFinTimestamp - $dateReservationTimestamp) - ($heureDebutTimestamp - $dateReservationTimestamp);
            echo "DAAAAAAAAAAAAAAAAH ";
            echo $tempsReservation/3600;

            $em->persist($reservation);
            $em->flush();
        }

        return $this->render('GCReservationBundle:Default:reservation-private-a.html.twig', array(
            'form' => $form->createView(),
        ));
    }

}
