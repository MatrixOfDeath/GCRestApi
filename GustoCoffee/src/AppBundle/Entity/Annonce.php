<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * Annonce
 *
 * @ORM\Table(name="Annonce", indexes={@ORM\Index(name="FK_Annonce_idPersonne", columns={"idPersonne"})})
 * @ORM\Entity
 */
class Annonce
{
    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=25, nullable=true)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="corps", type="text", length=1000, nullable=true)
     */
    private $corps;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateCreation", type="datetime", nullable=true)
     */
    private $datecreation;

    /**
     * @var integer
     *
     * @ORM\Column(name="idAnnonce", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idannonce;

    /**
     * @var \AppBundle\Entity\Personne
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Personne")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idPersonne", referencedColumnName="id")
     * })
     */
    private $idpersonne;

    public function __construct()
    {
        $this->setDatecreation(new \DateTime(date('d-m-Y H:m:s')));

    }

    /**
     * Set titre
     *
     * @param string $titre
     *
     * @return Annonce
     */
    public function setTitre($titre)
    {
        $this->titre = $titre;

        return $this;
    }

    /**
     * Get titre
     *
     * @return string
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Set corps
     *
     * @param string $corps
     *
     * @return Annonce
     */
    public function setCorps($corps)
    {
        $this->corps = $corps;

        return $this;
    }

    /**
     * Get corps
     *
     * @return string
     */
    public function getCorps()
    {
        return $this->corps;
    }

    /**
     * Set datecreation
     *
     * @param \DateTime $datecreation
     *
     * @return Annonce
     */
    public function setDatecreation($datecreation)
    {
        $this->datecreation = $datecreation;

        return $this;
    }

    /**
     * Get datecreation
     *
     * @return \DateTime
     */
    public function getDatecreation()
    {
        return $this->datecreation;
    }

    /**
     * Get idannonce
     *
     * @return integer
     */
    public function getIdannonce()
    {
        return $this->idannonce;
    }

    /**
     * Set idpersonne
     *
     * @param \AppBundle\Entity\Personne $idpersonne
     *
     * @return Annonce
     */
    public function setIdpersonne(\AppBundle\Entity\Personne $idpersonne = null)
    {
        $this->idpersonne = $idpersonne;

        return $this;
    }

    /**
     * Get idpersonne
     *
     * @return \AppBundle\Entity\Personne
     */
    public function getIdpersonne()
    {
        return $this->idpersonne;
    }


}
