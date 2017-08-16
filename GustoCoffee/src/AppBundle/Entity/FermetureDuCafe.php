<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FermetureDuCafe
 *
 * @ORM\Table(name="Fermeture_du_Cafe", indexes={@ORM\Index(name="dateDebut", columns={"dateDebut", "dateFin"})})
 * @ORM\Entity
 */
class FermetureDuCafe
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateDebut", type="date", nullable=true)
     */
    private $datedebut;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateFin", type="date", nullable=true)
     */
    private $datefin;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255, nullable=true)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="raison", type="text", length=255, nullable=true)
     */
    private $raison;

    /**
     * @var string
     *
     * @ORM\Column(name="jourFerie", type="string", length=25, nullable=true)
     */
    private $jourferie;

    /**
     * @var integer
     *
     * @ORM\Column(name="idFermeture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idfermeture;



    /**
     * Set datedebut
     *
     * @param \DateTime $datedebut
     *
     * @return FermetureDuCafe
     */
    public function setDatedebut($datedebut)
    {
        $this->datedebut = $datedebut;

        return $this;
    }

    /**
     * Get datedebut
     *
     * @return \DateTime
     */
    public function getDatedebut()
    {
        return $this->datedebut;
    }

    /**
     * Set datefin
     *
     * @param \DateTime $datefin
     *
     * @return FermetureDuCafe
     */
    public function setDatefin($datefin)
    {
        $this->datefin = $datefin;

        return $this;
    }

    /**
     * Get datefin
     *
     * @return \DateTime
     */
    public function getDatefin()
    {
        return $this->datefin;
    }

    /**
     * Set titre
     *
     * @param string $titre
     *
     * @return FermetureDuCafe
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
     * Set raison
     *
     * @param string $raison
     *
     * @return FermetureDuCafe
     */
    public function setRaison($raison)
    {
        $this->raison = $raison;

        return $this;
    }

    /**
     * Get raison
     *
     * @return string
     */
    public function getRaison()
    {
        return $this->raison;
    }

    /**
     * Set jourferie
     *
     * @param string $jourferie
     *
     * @return FermetureDuCafe
     */
    public function setJourferie($jourferie)
    {
        $this->jourferie = $jourferie;

        return $this;
    }

    /**
     * Get jourferie
     *
     * @return string
     */
    public function getJourferie()
    {
        return $this->jourferie;
    }

    /**
     * Get idfermeture
     *
     * @return integer
     */
    public function getIdfermeture()
    {
        return $this->idfermeture;
    }
}
