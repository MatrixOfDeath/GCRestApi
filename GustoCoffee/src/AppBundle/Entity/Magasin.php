<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Magasin
 *
 * @ORM\Table(name="Magasin", uniqueConstraints={@ORM\UniqueConstraint(name="nomMagasin", columns={"nomMagasin"})})
 * @ORM\Entity
 */
class Magasin
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomMagasin", type="string", length=25, nullable=true)
     */
    private $nommagasin;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse", type="string", length=25, nullable=true)
     */
    private $adresse;

    /**
     * @var integer
     *
     * @ORM\Column(name="idMagasin", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmagasin;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Salle", inversedBy="idmagasin")
     * @ORM\JoinTable(name="choisir",
     *   joinColumns={
     *     @ORM\JoinColumn(name="idMagasin", referencedColumnName="idMagasin")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="idSalle", referencedColumnName="idSalle")
     *   }
     * )
     */
    private $idsalle;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idsalle = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set nommagasin
     *
     * @param string $nommagasin
     *
     * @return Magasin
     */
    public function setNommagasin($nommagasin)
    {
        $this->nommagasin = $nommagasin;

        return $this;
    }

    /**
     * Get nommagasin
     *
     * @return string
     */
    public function getNommagasin()
    {
        return $this->nommagasin;
    }

    /**
     * Set adresse
     *
     * @param string $adresse
     *
     * @return Magasin
     */
    public function setAdresse($adresse)
    {
        $this->adresse = $adresse;

        return $this;
    }

    /**
     * Get adresse
     *
     * @return string
     */
    public function getAdresse()
    {
        return $this->adresse;
    }

    /**
     * Get idmagasin
     *
     * @return integer
     */
    public function getIdmagasin()
    {
        return $this->idmagasin;
    }

    /**
     * Add idsalle
     *
     * @param \AppBundle\Entity\Salle $idsalle
     *
     * @return Magasin
     */
    public function addIdsalle(\AppBundle\Entity\Salle $idsalle)
    {
        $this->idsalle[] = $idsalle;

        return $this;
    }

    /**
     * Remove idsalle
     *
     * @param \AppBundle\Entity\Salle $idsalle
     */
    public function removeIdsalle(\AppBundle\Entity\Salle $idsalle)
    {
        $this->idsalle->removeElement($idsalle);
    }

    /**
     * Get idsalle
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdsalle()
    {
        return $this->idsalle;
    }
}
