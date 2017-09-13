<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;


class ApiController extends FOSRestController
{
    /**
     * @Route("/api", options={"i18n"=false})
     */
    public function indexAction()
    {
        if (false === $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            #$data = array("not" => "world");

            #throw new AccessDeniedException();
        }
        $data = array("GustoCoffee Api" => "v1.0",
            "Api Doc link" => "/api/doc");
        return $this->view($data);
        return $this->handleView($view);
    }

    public function createClient()
    {
        /*
        $clientManager = $this->container->get('fos_oauth_server.client_manager.default');
        $client = $clientManager->createClient();
        $client->setRedirectUris(array('http://dev.gc.fr'));
        $client->setAllowedGrantTypes(array('token', 'authorization_code'));
        $clientManager->updateClient($client);

        return $this->redirect($this->generateUrl('fos_oauth_server_authorize', array(
            'client_id'     => $client->getPublicId(),
            'redirect_uri'  => 'http://dev.gc.fr',
            'response_type' => 'code'
        )));*/
    }
}