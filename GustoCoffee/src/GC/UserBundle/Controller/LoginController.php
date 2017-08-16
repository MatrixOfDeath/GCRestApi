<?php

namespace GC\UserBundle\Controller;


use AppBundle\Form\PersonneType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Personne;

class LoginController extends Controller
{
    protected $identifiant;
    protected $motdepasse;


    public function inscriptionAction(Request $request){
        $personne = new Personne();
        $form = $this->createForm(PersonneType::class, $personne);
        $form->handleRequest($request);

        if ($form->isSubmitted() & $form->isValid()){
            $personneForm = $form->getData();
            $this->identifiant = $form->get('indentifiant')->getData();
            $this->motdepasse = $form->get('motdepasse')->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($personneForm);
            $em->flush();
        }

        return $this->render('GCUserBundle:Default:index.html.twig', array('form' => $form->createView(),
        ));
    }
}