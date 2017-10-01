<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use AppBundle\Entity\ModeDePaiement;

/**
 * Generated by Webonaute\DoctrineFixtureGenerator.
 *
 */
class LoadFixtureModeDePaiement extends AbstractFixture implements OrderedFixtureInterface
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
        $manager->getClassMetadata(ModeDePaiement::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $item1 = new ModeDePaiement();
        $item1->setModepaiement("Paypal");
        $item1->setDescription("Plateforme de paiement en");
        $this->addReference('_reference_AppBundleEntityModeDePaiement1', $item1);
        $manager->persist($item1);

        $item2 = new ModeDePaiement();
        $item2->setModepaiement("Carte Bleu");
        $this->addReference('_reference_AppBundleEntityModeDePaiement2', $item2);
        $manager->persist($item2);

        $item3 = new ModeDePaiement();
        $item3->setModepaiement("MasterCard");
        $this->addReference('_reference_AppBundleEntityModeDePaiement3', $item3);
        $manager->persist($item3);

        $item4 = new ModeDePaiement();
        $item4->setModepaiement("Visa Card");
        $this->addReference('_reference_AppBundleEntityModeDePaiement4', $item4);
        $manager->persist($item4);

        $item5 = new ModeDePaiement();
        $item5->setModepaiement("Espèce");
        $this->addReference('_reference_AppBundleEntityModeDePaiement5', $item5);
        $manager->persist($item5);

        $item6 = new ModeDePaiement();
        $item6->setModepaiement("Ticket Restaurant");
        $this->addReference('_reference_AppBundleEntityModeDePaiement6', $item6);
        $manager->persist($item6);

    
        $manager->flush();
    }

}