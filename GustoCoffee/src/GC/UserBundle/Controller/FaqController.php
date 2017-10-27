<?php

namespace GC\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FaqController extends Controller
{
    public function indexAction()
    {
        return $this->render('GCUserBundle:Default:faq.html.twig');
    }
}
