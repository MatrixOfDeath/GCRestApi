<?php

namespace GC\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;

/**
 * @Cache(expires="+2 days", public=true)
 */
class ContactController extends Controller
{
    public function indexAction(Request $request)
    {
        $form = $this->createForm('AppBundle\Form\Type\ContactType', null, array(
            'action' => $this->generateUrl('gc_contact_page'),
            'method' => 'POST'
        ));

        if ($request->isMethod('POST')){
            $form->handleRequest($request);

            if($form->isValid()){
                if($this->sendEmail($form->getData())){
                    return $this->redirectToRoute('gc_contact_page');
                } else {
                    $this->addFlash('notice', $this->get('translator')->trans('Erreur d\'envoie de mail'));
                }
            }
        }

        return $this->render('GCUserBundle:Default:contact.html.twig', array(
            'form' => $form->createView()
        ));
    }

    private function sendEmail($data){
        $myappContactMail = $this->container->getParameter('mailer_user');
        $myappContactPassword = $this->container->getParameter('mailer_password');

        $transport = \Swift_SmtpTransport::newInstance('smtp.gmail.com', 465,'ssl')->setUsername($myappContactMail)->setPassword($myappContactPassword);

        $mailer = \Swift_Mailer::newInstance($transport);
        $message = \Swift_Message::newInstance($data["subject"])
            ->setFrom(array($myappContactMail => "Message by ".$data["name"]))
            ->setTo(array(
                $myappContactMail => $myappContactMail
            ))
            ->setBody($data["message"]."\n\nEnvoyé par :".$data["email"]);

        return $mailer->send($message);

    }
}