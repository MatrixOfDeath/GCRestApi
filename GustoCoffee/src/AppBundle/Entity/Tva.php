<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tva
 *
 * @ORM\Table(name="TVA")
 * @ORM\Entity
 */
class Tva
{
    /**
     * @var float
     *
     * @ORM\Column(name="tauxTva", type="float", precision=10, scale=0, nullable=true)
     */
    private $tauxtva;

    /**
     * @var string
     *
     * @ORM\Column(name="codeTva", type="string", length=25, nullable=true)
     */
    private $codetva;

    /**
     * @var integer
     *
     * @ORM\Column(name="idTva", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idtva;



    /**
     * Set tauxtva
     *
     * @param float $tauxtva
     *
     * @return Tva
     */
    public function setTauxtva($tauxtva)
    {
        $this->tauxtva = $tauxtva;

        return $this;
    }

    /**
     * Get tauxtva
     *
     * @return float
     */
    public function getTauxtva()
    {
        return $this->tauxtva;
    }

    /**
     * Set codetva
     *
     * @param string $codetva
     *
     * @return Tva
     */
    public function setCodetva($codetva)
    {
        $this->codetva = $codetva;

        return $this;
    }

    /**
     * Get codetva
     *
     * @return string
     */
    public function getCodetva()
    {
        return $this->codetva;
    }

    /**
     * Get idtva
     *
     * @return integer
     */
    public function getIdtva()
    {
        return $this->idtva;
    }
}
