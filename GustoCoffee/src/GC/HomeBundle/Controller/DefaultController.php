<?php

namespace GC\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;

/**
 * @Cache(expires="+2 days", public=true)
 */
class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GCHomeBundle:Default:index.html.twig');
    }
}
