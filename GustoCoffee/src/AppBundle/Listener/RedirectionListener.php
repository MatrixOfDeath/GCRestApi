<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 23/09/2017
 * Time: 17:46
 */

namespace AppBundle\Listener;

use AppBundle\Security\TokenAuthenticator;
use SensioLabs\Security\SecurityChecker;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Routing\RouterInterface;

class RedirectionListener implements ContainerAwareInterface
{
    use ContainerAwareTrait;

    private $session;
    private $securityContext;

    public function __construct(SessionInterface $session, RouterInterface $router, $securityContext)
    {
        $this->session = $session;
        $this->router = $router;
        $this->securityContext = $securityContext;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        $route = $event->getRequest()->attributes->get('_route');

        if ($route == 'livraison_panier' || $route == 'validation_panier') {

            if (!is_object($this->securityContext->getToken()->getUser())) {
                $this->session->getFlashBag()->add('notification','Vous devez vous identifier');
                $event->setResponse(new RedirectResponse($this->router->generate('fos_user_security_login')));
            }
        }

        if ($route == 'ajax_adresses_panier' || $route == 'ajax_validation_panier') {

            if (!is_object($this->securityContext->getToken()->getUser())) {
                $this->session->getFlashBag()->add('notification','Vous devez vous identifier');
                $event->setResponse(new RedirectResponse($this->router->generate('fos_user_security_login')));
            }
        }
    }
}