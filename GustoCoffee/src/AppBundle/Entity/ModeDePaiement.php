<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ModeDePaiement
 *
 * @ORM\Table(name="Mode_de_Paiement", indexes={@ORM\Index(name="modePaiement", columns={"modePaiement"})})
 * @ORM\Entity
 */
class ModeDePaiement
{
    /**
     * @var string
     *
     * @ORM\Column(name="modePaiement", type="string", length=255, nullable=true)
     */
    private $modepaiement;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="idModePaiement", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmodepaiement;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Facture", mappedBy="idmodepaiement")
     */
    private $idfacture;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idfacture = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set modepaiement
     *
     * @param string $modepaiement
     *
     * @return ModeDePaiement
     */
    public function setModepaiement($modepaiement)
    {
        $this->modepaiement = $modepaiement;

        return $this;
    }

    /**
     * Get modepaiement
     *
     * @return string
     */
    public function getModepaiement()
    {
        return $this->modepaiement;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return ModeDePaiement
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Get idmodepaiement
     *
     * @return integer
     */
    public function getIdmodepaiement()
    {
        return $this->idmodepaiement;
    }

    /**
     * Add idfacture
     *
     * @param \AppBundle\Entity\Facture $idfacture
     *
     * @return ModeDePaiement
     */
    public function addIdfacture(\AppBundle\Entity\Facture $idfacture)
    {
        $this->idfacture[] = $idfacture;

        return $this;
    }

    /**
     * Remove idfacture
     *
     * @param \AppBundle\Entity\Facture $idfacture
     */
    public function removeIdfacture(\AppBundle\Entity\Facture $idfacture)
    {
        $this->idfacture->removeElement($idfacture);
    }

    /**
     * Get idfacture
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdfacture()
    {
        return $this->idfacture;
    }
}
