<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 23/09/2017
 * Time: 17:46
 */

namespace AppBundle\Listener;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class RedirectionListener
{
    public function __construct(ContainerInterface $container, SessionInterface $session)
    {
        $this->session = $session;
        $this->router = $container->get('router');
        $this->securityContext = $container->get('security.token_storage');
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        $route = $event->getRequest()->attributes->get('_route');

        if ($route == 'livraison_panier' || $route == 'validation_panier') {
            if ($this->session->has('panier_salle')) {
                if (count($this->session->get('panier_salle')) == 0)
                    $event->setResponse(new RedirectResponse($this->router->generate('panier')));
            }

            if (!is_object($this->securityContext->getToken()->getUser())) {
                $this->session->getFlashBag()->add('notification','Vous devez vous identifier');
                $event->setResponse(new RedirectResponse($this->router->generate('fos_user_security_login')));
            }
        }

        if ($route == 'ajax_adresses_panier' || $route == 'ajax_validation_panier') {
            if ($this->session->has('panier_salle')) {
                if (count($this->session->get('panier_salle')) == 0)
                    $event->setResponse(new RedirectResponse($this->router->generate('panier')));
            }

            if (!is_object($this->securityContext->getToken()->getUser())) {
                $this->session->getFlashBag()->add('notification','Vous devez vous identifier');
                $event->setResponse(new RedirectResponse($this->router->generate('fos_user_security_login')));
            }
        }
    }
}