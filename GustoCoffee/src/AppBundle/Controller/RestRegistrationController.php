<?php

namespace AppBundle\Controller;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\EventDispatcher\ContainerAwareEventDispatcher;
use FOS\UserBundle\Controller\RegistrationController as BaseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\Form\FormInterface;
use JMS\Serializer\SerializationContext;

/**
 * @Route("/api/user", options={"i18n"=false})
 */
class RestRegistrationController extends BaseController
{
    /**
     * @Route("/register", name="user_register")
     * @Method("POST")
     */
    public function registerAction(Request $request)
    {
        /** @var \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $container = new ContainerBuilder();
        $dispatcher = new ContainerAwareEventDispatcher($container);
        //$dispatcher = $this->get('event_dispatcher');

        $user = $userManager->createUser();
        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm(array('csrf_protection' => false));
        $form->setData($user);
        $this->processForm($request, $form);

        if ($form->isValid()) {
            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(
                FOSUserEvents::REGISTRATION_SUCCESS, $event
            );

            $userManager->updateUser($user);

            $response = new Response($this->serialize('Utilisateur créer, vous allez recevoir un mail de confirmation pour activer votre compte.'), Response::HTTP_CREATED);
        }else {
            throw new BadRequestHttpException();
        }


        return $this->setBaseHeaders($response);
    }

    /**
     * @param  Request $request
     * @param  FormInterface $form
     */
    private function processForm(Request $request, FormInterface $form)
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            throw new BadRequestHttpException();
        }

        $form->submit($data);
    }

    /**
     * Data serializing via JMS serializer.
     *
     * @param mixed $data
     *
     * @return string JSON string
     */
    private function serialize($data)
    {
        $context = new SerializationContext();
        $context->setSerializeNull(true);

        return $this->get('jms_serializer')
            ->serialize($data, 'json', $context);
    }

    /**
     * Set base HTTP headers.
     *
     * @param Response $response
     *
     * @return Response
     */
    private function setBaseHeaders(Response $response)
    {
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
