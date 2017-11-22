<?php

namespace GC\ReservationBundle\Controller;

use AppBundle\Entity\JoursOuvert;
use AppBundle\Entity\Reservation;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints\DateTime;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;

/**
 * @Cache(expires="+2 days", public=true)
 */
class DefaultController extends Controller
{
    protected $dateReservation;
    protected $heureDebut;
    protected $heureFin;
    protected $tempsReservation;
    protected $dateReservationTimestamp;
    protected $heureDebutTimestamp;
    protected $heureFinTimestamp;

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
        $form = $this->createForm('AppBundle\Form\Type\ReservationType', $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $this->dateReservation = $reservation->getDatereservation();
            $this->dateReservation->date;
            $this->dateReservationTimestamp = $this->dateReservation->getTimestamp();

            $this->heureDebut = $reservation->getHeuredebut();
            $this->heureDebut->date;
            $this->heureDebutTimestamp = $this->heureDebut->getTimestamp();

            $this->heureFin = $reservation->getHeurefin();
            $this->heureFin->date;
            $this->heureFinTimestamp = $this->heureFin->getTimestamp();

            $this->tempsReservation = (($this->heureFinTimestamp - $this->dateReservationTimestamp) - ($this->heureDebutTimestamp - $this->dateReservationTimestamp)) /3600;

            $em->persist($reservation);
            $em->flush();
            $this->pdfAction();
        }

        return $this->render('GCReservationBundle:Default:reservation-private-a.html.twig', array(
            'form' => $form->createView(),
        ));
    }


    public function pdfAction()
    {
        $temps = $this->tempsReservation;
        $data = array(
            'tempsReservation'=>$temps
        );
        $html = $this->renderView('GCReservationBundle:Default:facture.html.twig', $data);
        $filename = sprintf('test-%s.pdf', date('Y-m-d'));

        return new Response(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            200,
            [
                'Content-Type'        => 'application/pdf',
                'Content-Disposition' => sprintf('attachment; filename="%s"', $filename),
            ]
        );
    }
}
