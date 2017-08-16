<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RuleUtilisateur
 *
 * @ORM\Table(name="Rule_Utilisateur")
 * @ORM\Entity
 */
class RuleUtilisateur
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomRule", type="string", length=25, nullable=true)
     */
    private $nomrule;

    /**
     * @var integer
     *
     * @ORM\Column(name="idRule", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idrule;



    /**
     * Set nomrule
     *
     * @param string $nomrule
     *
     * @return RuleUtilisateur
     */
    public function setNomrule($nomrule)
    {
        $this->nomrule = $nomrule;

        return $this;
    }

    /**
     * Get nomrule
     *
     * @return string
     */
    public function getNomrule()
    {
        return $this->nomrule;
    }

    /**
     * Get idrule
     *
     * @return integer
     */
    public function getIdrule()
    {
        return $this->idrule;
    }
}
