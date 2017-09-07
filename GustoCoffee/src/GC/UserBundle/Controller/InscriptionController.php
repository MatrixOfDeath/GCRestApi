<?php

namespace GC\UserBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AppBundle\Form\PersonneType;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Personne;


class InscriptionController extends Controller
{
    protected $identifiant;
    protected $motdepasse;
    protected $nom;
    protected $prenom;
    protected $adresse;
    protected $codepostal;


    public function inscriptionAction(Request $request){
        $personne = new Personne();
        $form = $this->createForm(PersonneType::class, $personne);
        $form->handleRequest($request);

        if ($form->isSubmitted() & $form->isValid()){
            $personneForm = $form->getData();
            $this->identifiant = $form->get('indentifiant')->getData();
            $this->motdepasse = $form->get('motdepasse')->getData();
            $this->nom = $form->get('nom')->getData();
            $this->prenom = $form->get('prenom')->getData();
            $this->adresse = $form->get('adresse')->getData();
            $this->codepostal = $form->get('codepostal')->getData();
            //TODO SET PAR DEFAUT LE RESTE + Cacher les autres champs !
            $em = $this->getDoctrine()->getManager();
            $em->persist($personneForm);
            $em->flush();
        }

        return $this->render('GCUserBundle:Default:inscription.html.twig', array('form' => $form->createView(),
        ));
    }
}