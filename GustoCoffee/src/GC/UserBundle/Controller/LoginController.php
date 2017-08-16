<?php

namespace GC\UserBundle\Controller;


use AppBundle\Form\PersonneType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Personne;

class LoginController extends Controller
{
    public function connexionAction(Request $request){
        $personne = new Personne();
        $form = $this->createForm(PersonneType::class, $personne);
        $form->handleRequest($request);

        if ($form->isSubmitted() & $form->isValid()){
        }

        return $this->render('GCUserBundle:Default:index.html.twig', array('form' => $form->createView(),
        ));
    }
}