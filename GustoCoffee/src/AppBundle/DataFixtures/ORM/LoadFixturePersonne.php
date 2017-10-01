<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use AppBundle\Entity\Personne;

/**
 * Generated by Webonaute\DoctrineFixtureGenerator.
 *
 */
class LoadFixturePersonne extends AbstractFixture implements OrderedFixtureInterface
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
        $manager->getClassMetadata(Personne::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $item7 = new Personne();
        $item7->setUsername("karim.boubrit");
        $item7->setUsernameCanonical("karim.boubrit");
        $item7->setEmail("email@email.com");
        $item7->setEmailCanonical("email@email.com");
        $item7->setEnabled(true);
        $item7->setPassword("\$2y\$13\$ojwfEMRQUEjv0Pz7Miw23eerfHV0Ng2b4O0dpBtUGFp2q51VluX5.");
        $this->addReference('_reference_AppBundleEntityPersonne7', $item7);
        $manager->persist($item7);

        $item8 = new Personne();
        $item8->setUsername("admin");
        $item8->setUsernameCanonical("admin");
        $item8->setEmail("gustocoffee.official@gmail.com");
        $item8->setEmailCanonical("gustocoffee.official@gmail.com");
        $item8->setEnabled(true);
        $item8->setPassword("\$2y\$13\$FLyuPg7ASlXbNLajRp6OsOY4deRAKcB0tMCFyfZHHCTfio55etFQu");
        $item8->setLastLogin(new \DateTime("2017-09-21 23:28:42"));
        $item8->setRoles(unserialize('a:1:{i:0;s:16:"ROLE_SUPER_ADMIN";}'));
        $this->addReference('_reference_AppBundleEntityPersonne8', $item8);
        $manager->persist($item8);

        $item9 = new Personne();
        $item9->setUsername("testuser");
        $item9->setUsernameCanonical("testuser");
        $item9->setEmail("test@user.com");
        $item9->setEmailCanonical("test@user.com");
        $item9->setEnabled(true);
        $item9->setPassword("\$2y\$13\$k19DZp0bMB9uLnmbmnF9XerOX85vFFIr8gk8WtQ.7v3WT9VYksaCG");
        $item9->setLastLogin(new \DateTime("2017-09-13 17:31:26"));
        $this->addReference('_reference_AppBundleEntityPersonne9', $item9);
        $manager->persist($item9);

    
        $manager->flush();
    }

}