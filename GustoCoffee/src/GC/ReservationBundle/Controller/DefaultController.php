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
            echo $dateReservation->date;
            echo " ok ";
            echo $dateReservation->getTimestamp();

            $heureDebut = $reservation->getHeuredebut();
            print_r($heureDebut);
            echo $heureDebut->date;
            echo " ok ";
            echo $heureDebut->getTimestamp();

            $heureFin = $reservation->getHeurefin();
            print_r($heureFin);
            echo $heureFin->date;
            echo " ok ";
            echo $heureFin->getTimestamp();

            $em->persist($reservation);
            $em->flush();
        }

/*        $this->dateReservation = $form->get('datereservation')->getData();
        $this->heureDebut = $form->get('datereservation')->getData();
        $this->heureFin = $form->get('datereservation')->getData();

        $this->dateReservation = date('U');
        echo "toto ";
        echo $this->dateReservation;

        $this->heureDebut = date('U');
        echo " toto ";
        echo $this->heureDebut;


        $this->heureFin = date('U');
        echo " toto ";
        echo $this->heureFin;*/

        return $this->render('GCReservationBundle:Default:reservation-private-a.html.twig', array(
            'form' => $form->createView(),
        ));
    }

}
