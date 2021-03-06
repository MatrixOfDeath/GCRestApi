<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use AppBundle\Entity\Produit;

/**
 * Generated by Webonaute\DoctrineFixtureGenerator.
 *
 */
class FixtureProduit extends AbstractFixture implements OrderedFixtureInterface
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
        $manager->getClassMetadata(Produit::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $item1 = new Produit();
        $item1->setNomproduit("Déjeuner");
        $item1->setPrixproduit("10");
        $item1->setDescription("Service du déjeuner");
        $item1->setQuantiteenstock(100);
        $item1->setStatutproduit(0);
        $item1->setImage("");
        $item1->setTva($this->getReference('_reference_Proxies__CG__AppBundleEntityTva'));
        $item1->setUpdatedAt(new \DateTime("-0001-11-30 00:00:00"));
        $item1->setCreatedAt(new \DateTime("-0001-11-30 00:00:00"));
        $this->addReference('_reference_AppBundleEntityProduit1', $item1);
        $manager->persist($item1);

        $item2 = new Produit();
        $item2->setNomproduit("Diner");
        $item2->setPrixproduit("12");
        $item2->setDescription("Service du diner");
        $item2->setQuantiteenstock(50);
        $item2->setStatutproduit(0);
        $item2->setImage("");
        $item2->setTva($this->getReference('_reference_Proxies__CG__AppBundleEntityTva'));
        $item2->setUpdatedAt(new \DateTime("-0001-11-30 00:00:00"));
        $item2->setCreatedAt(new \DateTime("-0001-11-30 00:00:00"));
        $this->addReference('_reference_AppBundleEntityProduit2', $item2);
        $manager->persist($item2);

        $item3 = new Produit();
        $item3->setNomproduit("Frapuccino");
        $item3->setPrixproduit("3");
        $item3->setDescription("Café glacé avec crème fouetté");
        $item3->setImage("21845389_10213433764905917_1513641340_o.jpg");
        $item3->setTva($this->getReference('_reference_Proxies__CG__AppBundleEntityTva0'));
        $item3->setUpdatedAt(new \DateTime("2017-09-19 15:42:28"));
        $item3->setCreatedAt(new \DateTime("-0001-11-30 00:00:00"));
        $this->addReference('_reference_AppBundleEntityProduit3', $item3);
        $manager->persist($item3);

        $item4 = new Produit();
        $item4->setNomproduit("PetitDejeuner");
        $item4->setPrixproduit("5");
        $item4->setDescription("Service du petit déjeuner");
        $item4->setImage("frapuccino.jpg");
        $item4->setTva($this->getReference('_reference_Proxies__CG__AppBundleEntityTva0'));
        $item4->setUpdatedAt(new \DateTime("2017-09-19 15:43:26"));
        $item4->setCreatedAt(new \DateTime("-0001-11-30 00:00:00"));
        $this->addReference('_reference_AppBundleEntityProduit4', $item4);
        $manager->persist($item4);

    
        $manager->flush();
    }

}
