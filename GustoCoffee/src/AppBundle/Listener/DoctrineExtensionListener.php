<?php

namespace AppBundle\Listener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class DoctrineExtensionListener implements ContainerAwareInterface
{
    use ContainerAwareTrait;


    public function qerserr()
    {
        $this->container;
    }
}