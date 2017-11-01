<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LigneFacture
 *
 * @ORM\Table(name="Ligne_Facture", indexes={
 *     @ORM\Index(name="FK_Ligne_Facture_idFacture", columns={"idFacture"})})
 * @ORM\Entity
 */
class LigneFacture
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idLigneFacture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idlignefacture;

    /**
     * @var \AppBundle\Entity\Facture
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Facture")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idFacture", referencedColumnName="idFacture")
     * })
     */
    private $idfacture;

    /**
     * Get idlignefacture
     *
     * @return integer
     */
    public function getIdlignefacture()
    {
        return $this->idlignefacture;
    }

    /**
     * Set idfacture
     *
     * @param \AppBundle\Entity\Facture $idfacture
     *
     * @return LigneFacture
     */
    public function setIdfacture(\AppBundle\Entity\Facture $idfacture = null)
    {
        $this->idfacture = $idfacture;

        return $this;
    }

    /**
     * Get idfacture
     *
     * @return \AppBundle\Entity\Facture
     */
    public function getIdfacture()
    {
        return $this->idfacture;
    }

}
