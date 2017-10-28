<?php

namespace GC\EvenementBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;

/**
 * @Cache(expires="+2 days", public=true)
 */
class EvenementController extends Controller
{
    public function indexAction()
    {
        return $this->render('GCEvenementBundle:Default:index.html.twig');
    }
}
