<?php

namespace AppBundle\Controller\Api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use AppBundle\Entity\Personne;
use AppBundle\Service\MyUserManager;
use Swagger\Annotations as SWG;


/**
 * @Route("/user", options={"i18n"=false})
 */
class RestLoginController extends Controller
{
    use \AppBundle\Helper\ControllerHelper;

    /**
     * @Route("/login", name="user_login")
     * @Method("POST")
     */
    public function loginAction(Request $request)
    {
        $usernameOrEmail = $request->getUser();
        $password = $request->getPassword();

        /** @var MyUserManager
         *
         */
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserByUsernameOrEmail($usernameOrEmail);

        if (!$user) {
            throw $this->createNotFoundException();
        }

        $isValid = $this->get('security.password_encoder')
            ->isPasswordValid($user, $password);

        if (!$isValid) {
            throw new BadCredentialsException();
        }

        $token = $this->getToken($user);
        $response = new Response($this->serialize(['token' => $token]), Response::HTTP_OK);

        return $this->setBaseHeaders($response);
    }

    /**
     * Returns token for personne.
     *
     * @param Personne $user
     *
     * @return array
     */
    public function getToken(Personne $user)
    {
        return $this->container->get('lexik_jwt_authentication.encoder.default')
            ->encode([
                'username' => $user->getUsername(),
                'exp' => $this->getTokenExpiryDateTime(),
            ]);
    }

    /**
     * Returns token expiration datetime.
     *
     * @return string Unixtmestamp
     */
    private function getTokenExpiryDateTime()
    {
        $tokenTtl = $this->container->getParameter('lexik_jwt_authentication.token_ttl');
        $now = new \DateTime();
        $now->add(new \DateInterval('PT'.$tokenTtl.'S'));

        return $now->format('U');
    }
}