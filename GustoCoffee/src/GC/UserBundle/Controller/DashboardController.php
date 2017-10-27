<?php

namespace GC\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DashboardController extends Controller
{
    public function indexAction()
    {
        return $this->render('GCUserBundle:Default:dashboard.html.twig');
    }
}
