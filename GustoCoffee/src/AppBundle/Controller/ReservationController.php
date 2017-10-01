<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Reservation;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * Reservation controller.
 *
 * @Route("reservation")
 */
class ReservationController extends FOSRestController
{
    /**
     * Lists all reservation entities.
     *
     * @Route("/", name="reservation_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $reservations = $em->getRepository('AppBundle:Reservation')->findAll();

        return $this->render('reservation/index.html.twig', array(
            'reservations' => $reservations,
        ));
    }

    /**
     * Creates a new reservation entity.
     *
     * @Route("/new", name="reservation_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $reservation = new Reservation();
        $form = $this->createForm('AppBundle\Form\ReservationType', $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($reservation);
            $em->flush();

            return $this->redirectToRoute('reservation_show', array('idreservation' => $reservation->getIdreservation()));
        }

        return $this->render('reservation/new.html.twig', array(
            'reservation' => $reservation,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a reservation entity.
     *
     * @Route("/{idreservation}", name="reservation_show")
     * @Method("GET")
     */
    public function showAction(Reservation $reservation)
    {
        $deleteForm = $this->createDeleteForm($reservation);

        return $this->render('reservation/show.html.twig', array(
            'reservation' => $reservation,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing reservation entity.
     *
     * @Route("/{idreservation}/edit", name="reservation_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Reservation $reservation)
    {
        $deleteForm = $this->createDeleteForm($reservation);
        $editForm = $this->createForm('AppBundle\Form\ReservationType', $reservation);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('reservation_edit', array('idreservation' => $reservation->getIdreservation()));
        }

        return $this->render('reservation/edit.html.twig', array(
            'reservation' => $reservation,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a reservation entity.
     *
     * @Route("/{idreservation}", name="reservation_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Reservation $reservation)
    {
        $form = $this->createDeleteForm($reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($reservation);
            $em->flush();
        }

        return $this->redirectToRoute('reservation_index');
    }

    /**
     * Creates a form to delete a reservation entity.
     *
     * @param Reservation $reservation The reservation entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Reservation $reservation)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('reservation_delete', array('idreservation' => $reservation->getIdreservation())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }

    private function addReservatioFromSession(Request $request, SessionInterface $session){

        if (!$session->has('panier_salle')) $session->set('panier_salle',array(array('heureChoixDebut' => "", 'heureChoixFin' => "")));
        $panier_salle = $session->get('panier_salle');
        if (!$session->has('panier')) $session->set('panier',array());
        $panier = $session->get('panier');

        if($request->request->get('heureChoixDebut') && $request->request->get('heureChoixFin') && $request->request->get('idsalle')) {

            $heureChoixDebut = $request->request->get('heureChoixDebut');
            $heureChoixFin = $request->request->get('heureChoixFin');
            $dateReservation = $request->request->get('dateReservation');
            $idSalle = $request->request->get('idsalle');

            if (array_key_exists($idSalle, $panier_salle)) {
                $reservation = new Reservation();
                $reservation->setHeuredebut($heureChoixDebut );
                $reservation->setHeurefin($heureChoixFin );
                $reservation->setDatereservation($dateReservation);
                $reservation->setIdsalle($idSalle );
                $reservation->setIdpersonne($this->getUser());

                $em = $this->getDoctrine()->getManager();
                $em->persist($reservation);
                $em->flush();

                $panier_salle[$idSalle]['idReservation'] = $reservation->getIdreservation();
            }




            // On retourne l'id de la reservation
            return $reservation->getIdreservation();
        }

    }


    private function calculateDureeReservation($heureChoixDebut, $heureChoixFin){
        $d1 = new \DateTime($heureChoixDebut);
        $d2 = new \DateTime($heureChoixFin);
        $interval = $d1->diff($d2);

        return $interval;
    }
}
