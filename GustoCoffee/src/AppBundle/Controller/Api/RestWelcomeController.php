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
use Swagger\Annotations as SWG;
use Nelmio\ApiDocBundle\Annotation\Operation;


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
     * @Operation(
     *     tags={"Authentification"},
     *     summary="Message de bienvenue de l'utilisateur",
     *     @SWG\Response(
     *         response="200",
     *         description="Returned when successful"
     *     )
     * )
     * @return Response
     */
    public function welcomeAction(Request $request)
    {
        $usr = $this->getUser();
        $response = new Response($this->serialize('Bonjour '.$usr->getUsername()), Response::HTTP_OK);

        return $this->setBaseHeaders($response);
    }

    /**
     *
     * @Route("/collection", name="user_collection")
     * @Method("GET")
     * @Operation(
     *     tags={"User entity"},
     *     summary="Retourne toute la collection relié à l'utilisateur connecté",
     *     @SWG\Response(
     *         response="200",
     *         description="Returned when successful"
     *     )
     * )
     * @return Response
     */
    public function getCollectionUserAction(Request $request)
    {
        $response = new Response($this->serialize($this->getUser()), Response::HTTP_OK);

        return $this->setBaseHeaders($response);
    }


}