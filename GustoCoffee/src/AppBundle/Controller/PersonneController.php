<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Personne;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\VirtualProperty;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * Personne controller.
 *
 * @Route("personne")
 */
class PersonneController extends Controller
{



    /**
     * Finds and displays a personne entity.
     *
     * @Route("/{id}", name="personne_show")
     * @Method("GET")
     */
    public function showAction(Personne $personne)
    {
        $deleteForm = $this->createDeleteForm($personne);

        return $this->render('personne/show.html.twig', array(
            'personne' => $personne,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Creates a form to delete a personne entity.
     *
     * @param Personne $personne The personne entity
     * @Security("has_role('ROLE_ADMIN')")
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Personne $personne)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('personne_delete', array('id' => $personne->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }

    /**
     * @Route("/villes/{cp}", options={"expose"=true}, name="villes", requirements={"cp": "\d+"})
     * @Method({"POST", "GET"})
     * @param Request $request
     * @return mixed
     * @throws \Exception
     */
    public function villesAction(Request $request, $cp)
    {
        if ($request->isXmlHttpRequest()) {
            $em = $this->getDoctrine()->getManager();
            $villeCodePostal =$em->getRepository('AppBundle:Villes')->findCp($cp);

            if ($villeCodePostal) {
                $villes = array();
                foreach($villeCodePostal as $ville) {
                    $villes[] = $ville->getVilleNom();
                }
            } else {
                $villes = null;
            }

            $response = new JsonResponse();
            return $response->setData(array('ville' => $villes));
        } else {
            throw new \Exception('Erreur');
        }
    }

}
