<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

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
     * @ORM\Column(name="telephone", type="integer", length=10, nullable=true)
     */

    private $telephone;

    /**
     * @var integer
     *
     * @ORM\Column(name="idMagasin", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmagasin;

    /**
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Salle", mappedBy="idmagasin")
     *
     */
    private $idsalle;

    /**
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\GrilleTarifaire", mappedBy="idmagasin")
     *
     */
    private $idgrilletarifaire;

    /**
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\JoursOuvert", mappedBy="idmagasin")
     *
     */
    private $idouverture;

    /**
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\FermetureDuCafe", mappedBy="idmagasin")
     *
     */
    private $idfermeture;

    /**
     * @return mixed
     */
    public function getIdfermeture()
    {
        return $this->idfermeture;
    }

    /**
     * @param mixed $idfermeture
     */
    public function setIdfermeture($idfermeture)
    {
        $this->idfermeture = $idfermeture;
    }

    /**
     * @return mixed
     */
    public function getIdgrilletarifaire()
    {
        return $this->idgrilletarifaire;
    }

    /**
     * @param mixed $idgrilletarifaire
     */
    public function setIdgrilletarifaire($idgrilletarifaire)
    {
        $this->idgrilletarifaire = $idgrilletarifaire;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idsalle = new ArrayCollection();
        $this->idgrilletarifaire = new ArrayCollection();
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

    /**
     * @return string
     */
    public function __toString() {
        return $this->getNommagasin();
    }

    /**
     * @return int
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * @param int $telephone
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    }

    /**
     * Set idouverture
     *
     * @param \AppBundle\Entity\JoursOuvert $idouverture
     *
     * @return Reservation
     */
    public function setIdouverture(\AppBundle\Entity\JoursOuvert $idouverture = null)
    {
        $this->idouverture = $idouverture;

        return $this;
    }

    /**
     * Get idouverture
     *
     * @return \AppBundle\Entity\JoursOuvert
     */
    public function getIdouverture()
    {
        return $this->idouverture;
    }

}
