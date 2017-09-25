<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use AppBundle\Form\PersonneType;
use AppBundle\Entity\Personne;

/**
 * Panier controller.
 *
 * @Route("panier")
 */
class PanierController extends Controller
{

    public function menuAction(SessionInterface $session)
    {
        //$session = $this->getRequest()->getSession();
        if (!$session->has('panier'))
            $articles = 0;
        else
            $articles = count($session->get('panier'));
        
        return $this->render('panier/panier.html.twig', array(
            'articles' => $articles
        ));
    }

    /**
     * Index panier session.
     *
     * @param SessionInterface $session
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("/", name="panier")
     * @Method({"GET", "POST"})
     */
    public function panierAction(SessionInterface $session)
    {
        // $session = $this->getRequest()->getSession();
        if (!$session->has('panier')) $session->set('panier', array());

        $em = $this->getDoctrine()->getManager();
        $produits = $em->getRepository('AppBundle:Produit')->findArray(array_keys($session->get('panier')));

        return $this->render('panier/layout/panier.html.twig', array(
            'produits' => $produits,
            'panier' => $session->get('panier')
        ));
    }

    /**
     * Delete panier session.
     *
     * @Route("/delete/{id}", name="delete_panier")
     * @Method({"GET", "POST"})
     */
    public function supprimerAction(SessionInterface $session, $id)
    {
        //$session = $this->getRequest()->getSession();

        $panier = $session->get('panier');
        
        if (array_key_exists($id, $panier))
        {
            unset($panier[$id]);
            $session->set('panier',$panier);
            $this->get('session')->getFlashBag()->add('success','Article supprimé avec succès');
        }
        
        return $this->redirect($this->generateUrl('panier')); 
    }

    /**
     * Ajout panier session.
     * @param SessionInterface $session
     * @param Request $request
     * @param $id
     * @return RedirectResponse
     * @Route("/ajouter/{id}", name="ajout_panier")
     * @Method("GET")
     */
    public function ajouterAction(SessionInterface $session, Request $request, $id)
    {
        //$session = $this->getRequest()->getSession();
        
        if (!$session->has('panier')) $session->set('panier',array());
        $panier = $session->get('panier');
        
        if (array_key_exists($id, $panier)) {
            if ($request->query->get('qte') != null) $panier[$id] = $request->query->get('qte');
            $this->get('session')->getFlashBag()->add('success','Quantité modifié avec succès');
        } else {
            if ($request->query->get('qte') != null)
                $panier[$id] = $request->query->get('qte');
            else
                $panier[$id] = 1;
            
            $session->getFlashBag()->add('success','Article ajouté avec succès');
        }
            
        $session->set('panier',$panier);
        
        
        return $this->redirect($this->generateUrl('panier'));
    }



    /**
     * Action panier session.
     *
     * @Route("/livraison/adresse/delete/{id}", name="delete_adresse_panier")
     * @Method({"GET", "POST"})
     */
    public function adresseSuppressionAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('AppBundle:Personne')->find($id);
        
        if ($this->container->get('security.token_storage')->getToken()->getUser() != $entity->getPersonne() || !$entity)
            return $this->redirect ($this->generateUrl ('livraison_panier'));
        
        $em->remove($entity);
        $em->flush();
        
        return $this->redirect ($this->generateUrl ('livraison_panier'));
    }

    /** TODO: Appeler cela une facturation
     *
     * @Route("/livraison", name="livraison_panier")
     * @Method({"GET", "POST"})
     */
    public function livraisonAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $utilisateur = $this->container->get('security.token_storage')->getToken()->getUser();
        //var_dump($utilisateur);  die();
        $personne = new Personne();
        $form = $this->createForm('AppBundle\Form\PersonneType', $utilisateur);
        
        if ($request->getMethod() == 'POST')
        {
            $form->handleRequest($request);
            if ($form->isValid()) {
                //$em = $this->getDoctrine()->getManager();
                //$personne->setPersonne($utilisateur);
                $em->persist($utilisateur);
                $em->flush();
                
                return $this->redirect($this->generateUrl('livraison_panier'));
            }
        }
        
        return $this->render('panier/layout/livraison.html.twig', array(
            'utilisateur' => $utilisateur,
            'form' => $form->createView()
        ));
    }

    /**
     * @return RedirectResponse
     */
    public function setLivraisonOnSession(Request $request, SessionInterface $session)
    {
        //$session = $this->getRequest()->getSession();
        
        if (!$session->has('adresse')) $session->set('adresse',array());
        $adresse = $session->get('adresse');
        
        if ($request->request->get('livraison') != null && $request->request->get('facturation') != null)
        {
            $adresse['livraison'] = $request->request->get('livraison');
            $adresse['facturation'] = $request->request->get('facturation');
        } else {
            return $this->redirect($this->generateUrl('validation_panier'));
        }
        
        $session->set('adresse',$adresse);
        return $this->redirect($this->generateUrl('validation_panier'));
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/validation", name="validation_panier")
     * @Method({"GET", "POST"})
     */
    public function validationAction(Request $request, SessionInterface $session)
    {
        if ($request->getMethod() == 'POST') {
            $this->setLivraisonOnSession($request, $session);
        }
        
        $em = $this->getDoctrine()->getManager();
        $prepareCommande = $this->forward('AppBundle:Commande:prepareCommande');
        $commande = $em->getRepository('AppBundle:Commande')->find($prepareCommande->getContent());
        
        return $this->render('panier/layout/validation.html.twig', array(
            'commande' => $commande
        ));
    }
}
