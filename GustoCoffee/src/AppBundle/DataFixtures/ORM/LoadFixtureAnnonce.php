<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use AppBundle\Entity\Annonce;

/**
 * Generated by Webonaute\DoctrineFixtureGenerator.
 *
 */
class LoadFixtureAnnonce extends AbstractFixture implements OrderedFixtureInterface
{

    /**
     * Set loading order.
     *
     * @return int
     */
    public function getOrder()
    {
        return ;
    }


    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $manager->getClassMetadata(Annonce::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $item2 = new Annonce();
        $item2->setTitre("zaeaze");
        $item2->setCorps("azeazeazeaze");
        $item2->setDatecreation(new \DateTime("2017-09-15 00:00:00"));
        $item2->setIdpersonne($this->getReference('_reference_Proxies__CG__AppBundleEntityPersonne7'));
        $this->addReference('_reference_AppBundleEntityAnnonce2', $item2);
        $manager->persist($item2);

        $item3 = new Annonce();
        $item3->setTitre("hello test");
        $item3->setCorps("eaeazeq sdq");
        $item3->setDatecreation(NULL);
        $item3->setIdpersonne($this->getReference('_reference_Proxies__CG__AppBundleEntityPersonne7'));
        $this->addReference('_reference_AppBundleEntityAnnonce3', $item3);
        $manager->persist($item3);

        $item4 = new Annonce();
        $item4->setTitre("sdfsdf");
        $item4->setCorps("sdfsdf");
        $item4->setDatecreation(new \DateTime("2017-09-15 09:09:00"));
        $this->addReference('_reference_AppBundleEntityAnnonce4', $item4);
        $manager->persist($item4);

        $item5 = new Annonce();
        $item5->setTitre("azezae");
        $item5->setCorps("azeaze");
        $item5->setDatecreation(new \DateTime("2017-09-15 22:09:16"));
        $this->addReference('_reference_AppBundleEntityAnnonce5', $item5);
        $manager->persist($item5);

        $item6 = new Annonce();
        $item6->setTitre("dqsdqsd");
        $item6->setCorps("qsdqsdqsd");
        $item6->setDatecreation(new \DateTime("2017-09-20 23:09:00"));
        $this->addReference('_reference_AppBundleEntityAnnonce6', $item6);
        $manager->persist($item6);

    
        $manager->flush();
    }

}
