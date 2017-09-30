<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 13/09/2017
 * Time: 18:39
 */

namespace AppBundle\Controller\Api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;


/**
 * @Security("is_granted('ROLE_USER')")
 *
 * @Route("/user", options={"i18n"=false})
 *
 */
class RestWelcomeController extends Controller
{
    use \AppBundle\Helper\ControllerHelper;

    /**
     * @Route("/welcome", name="user_welcome")
     * @Method("GET")
     */
    public function welcomeAction(Request $request)
    {
        $response = new Response($this->serialize('Bonjour utilisateur.'), Response::HTTP_OK);

        return $this->setBaseHeaders($response);
    }
}