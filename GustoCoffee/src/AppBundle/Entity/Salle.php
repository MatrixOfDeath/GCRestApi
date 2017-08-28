<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Salle
 *
 * @ORM\Table(name="Salle", uniqueConstraints={@ORM\UniqueConstraint(name="nomSalle", columns={"nomSalle"})})
 * @ORM\Entity
 */
class Salle
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomSalle", type="string", length=25, nullable=true)
     */
    private $nomsalle;

    /**
     * @var integer
     *
     * @ORM\Column(name="capacityMax", type="integer", nullable=true)
     */
    private $capacitymax;

    /**
     * @var string
     *
     * @ORM\Column(name="nomPlace", type="string", length=25, nullable=true)
     */
    private $nomplace;

    /**
     * @var integer
     *
     * @ORM\Column(name="idSalle", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idsalle;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Magasin", mappedBy="idsalle")
     */
    private $idmagasin;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idmagasin = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set nomsalle
     *
     * @param string $nomsalle
     *
     * @return Salle
     */
    public function setNomsalle($nomsalle)
    {
        $this->nomsalle = $nomsalle;

        return $this;
    }

    /**
     * Get nomsalle
     *
     * @return string
     */
    public function getNomsalle()
    {
        return $this->nomsalle;
    }

    /**
     * Set capacitymax
     *
     * @param integer $capacitymax
     *
     * @return Salle
     */
    public function setCapacitymax($capacitymax)
    {
        $this->capacitymax = $capacitymax;

        return $this;
    }

    /**
     * Get capacitymax
     *
     * @return integer
     */
    public function getCapacitymax()
    {
        return $this->capacitymax;
    }

    /**
     * Set nomplace
     *
     * @param string $nomplace
     *
     * @return Salle
     */
    public function setNomplace($nomplace)
    {
        $this->nomplace = $nomplace;

        return $this;
    }

    /**
     * Get nomplace
     *
     * @return string
     */
    public function getNomplace()
    {
        return $this->nomplace;
    }

    /**
     * Get idsalle
     *
     * @return integer
     */
    public function getIdsalle()
    {
        return $this->idsalle;
    }

    /**
     * Add idmagasin
     *
     * @param \AppBundle\Entity\Magasin $idmagasin
     *
     * @return Salle
     */
    public function addIdmagasin(\AppBundle\Entity\Magasin $idmagasin)
    {
        $this->idmagasin[] = $idmagasin;

        return $this;
    }

    /**
     * Remove idmagasin
     *
     * @param \AppBundle\Entity\Magasin $idmagasin
     */
    public function removeIdmagasin(\AppBundle\Entity\Magasin $idmagasin)
    {
        $this->idmagasin->removeElement($idmagasin);
    }

    /**
     * Get idmagasin
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdmagasin()
    {
        return $this->idmagasin;
    }
}