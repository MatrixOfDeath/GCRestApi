<?php

namespace GC\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;

/**
 * @Cache(expires="+2 days", public=true)
 */
class FaqController extends Controller
{
    public function indexAction()
    {
        return $this->render('GCUserBundle:Default:faq.html.twig');
    }
}
