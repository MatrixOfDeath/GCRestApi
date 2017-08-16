<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * JoursOuvert
 *
 * @ORM\Table(name="Jours_Ouvert")
 * @ORM\Entity
 */
class JoursOuvert
{
    /**
     * @var integer
     *
     * @ORM\Column(name="jours", type="integer", nullable=true)
     */
    private $jours;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="heureDebut", type="date", nullable=true)
     */
    private $heuredebut;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="heureFin", type="date", nullable=true)
     */
    private $heurefin;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255, nullable=true)
     */
    private $titre;

    /**
     * @var integer
     *
     * @ORM\Column(name="idOuverture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idouverture;



    /**
     * Set jours
     *
     * @param integer $jours
     *
     * @return JoursOuvert
     */
    public function setJours($jours)
    {
        $this->jours = $jours;

        return $this;
    }

    /**
     * Get jours
     *
     * @return integer
     */
    public function getJours()
    {
        return $this->jours;
    }

    /**
     * Set heuredebut
     *
     * @param \DateTime $heuredebut
     *
     * @return JoursOuvert
     */
    public function setHeuredebut($heuredebut)
    {
        $this->heuredebut = $heuredebut;

        return $this;
    }

    /**
     * Get heuredebut
     *
     * @return \DateTime
     */
    public function getHeuredebut()
    {
        return $this->heuredebut;
    }

    /**
     * Set heurefin
     *
     * @param \DateTime $heurefin
     *
     * @return JoursOuvert
     */
    public function setHeurefin($heurefin)
    {
        $this->heurefin = $heurefin;

        return $this;
    }

    /**
     * Get heurefin
     *
     * @return \DateTime
     */
    public function getHeurefin()
    {
        return $this->heurefin;
    }

    /**
     * Set titre
     *
     * @param string $titre
     *
     * @return JoursOuvert
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
     * Get idouverture
     *
     * @return integer
     */
    public function getIdouverture()
    {
        return $this->idouverture;
    }
}
