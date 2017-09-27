<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use AppBundle\Entity\JoursOuvert;

/**
 * Generated by Webonaute\DoctrineFixtureGenerator.
 *
 */
class LoadFixtureJoursOuvert extends AbstractFixture implements OrderedFixtureInterface
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
        $manager->getClassMetadata(JoursOuvert::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $item1 = new JoursOuvert();
        $item1->setJours("lundi");
        $item1->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item1->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert1', $item1);
        $manager->persist($item1);

        $item2 = new JoursOuvert();
        $item2->setJours("mardi");
        $item2->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item2->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert2', $item2);
        $manager->persist($item2);

        $item3 = new JoursOuvert();
        $item3->setJours("mercredi");
        $item3->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item3->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert3', $item3);
        $manager->persist($item3);

        $item4 = new JoursOuvert();
        $item4->setJours("jeudi");
        $item4->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item4->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert4', $item4);
        $manager->persist($item4);

        $item5 = new JoursOuvert();
        $item5->setJours("vendredi");
        $item5->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item5->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert5', $item5);
        $manager->persist($item5);

        $item6 = new JoursOuvert();
        $item6->setJours("samedi");
        $item6->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item6->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert6', $item6);
        $manager->persist($item6);

        $item7 = new JoursOuvert();
        $item7->setJours("dimanche");
        $item7->setHeuredebut(new \DateTime("1970-01-01 08:00:00"));
        $item7->setHeurefin(new \DateTime("1970-01-01 21:00:00"));
        $this->addReference('_reference_AppBundleEntityJoursOuvert7', $item7);
        $manager->persist($item7);

    
        $manager->flush();
    }

}
