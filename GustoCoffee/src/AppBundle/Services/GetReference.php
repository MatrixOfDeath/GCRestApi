<?php
namespace AppBundle\Services;

use Doctrine\ORM\EntityManager;

class GetReference 
{
    /**
     * @var EntityManager
     */
    private $em;

    public function __construct($securityContext, $entityManager)
    {
        $this->securityContext = $securityContext;
        $this->em = $entityManager;
    }
    
    public function reference()
    {
        $reference = $this->em->getRepository('AppBundle:Commande')->findOneBy(array('valider' => 1), array('idcommande' => 'DESC'));
        
        if (!$reference)
            return 1;
        else 
            return $reference->getReference() +1;
    }
}