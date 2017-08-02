<?php

namespace GC\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class HomeController extends Controller
{
    public function indexAction()
    {
        return $this->render('GCHomeBundle:Default:index.html.twig');
    }
}
