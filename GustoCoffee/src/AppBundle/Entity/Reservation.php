<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reservation
 *
 * @ORM\Table(name="Reservation", indexes={@ORM\Index(name="FK_Reservation_idFermeture", columns={"idFermeture"}), @ORM\Index(name="FK_Reservation_idPersonne", columns={"idPersonne"}), @ORM\Index(name="FK_Reservation_idModePaiement", columns={"idModePaiement"}), @ORM\Index(name="FK_Reservation_idMagasin", columns={"idMagasin"}), @ORM\Index(name="FK_Reservation_idOuverture", columns={"idOuverture"})})
 * @ORM\Entity
 */
class Reservation
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateReservation", type="date", nullable=true)
     */
    private $datereservation;

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
     * @ORM\Column(name="remarqueReservation", type="text", length=255, nullable=true)
     */
    private $remarquereservation;

    /**
     * @var string
     *
     * @ORM\Column(name="commentaireClient", type="text", length=255, nullable=true)
     */
    private $commentaireclient;

    /**
     * @var integer
     *
     * @ORM\Column(name="idReservation", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idreservation;

    /**
     * @var \AppBundle\Entity\FermetureDuCafe
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\FermetureDuCafe")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idFermeture", referencedColumnName="idFermeture")
     * })
     */
    private $idfermeture;

    /**
     * @var \AppBundle\Entity\Magasin
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Magasin")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idMagasin", referencedColumnName="idMagasin")
     * })
     */
    private $idmagasin;

    /**
     * @var \AppBundle\Entity\ModeDePaiement
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\ModeDePaiement")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idModePaiement", referencedColumnName="idModePaiement")
     * })
     */
    private $idmodepaiement;

    /**
     * @var \AppBundle\Entity\JoursOuvert
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\JoursOuvert")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idOuverture", referencedColumnName="idOuverture")
     * })
     */
    private $idouverture;

    /**
     * @var \AppBundle\Entity\Personne
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Personne")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idPersonne", referencedColumnName="idPersonne")
     * })
     */
    private $idpersonne;



    /**
     * Set datereservation
     *
     * @param \DateTime $datereservation
     *
     * @return Reservation
     */
    public function setDatereservation($datereservation)
    {
        $this->datereservation = $datereservation;

        return $this;
    }

    /**
     * Get datereservation
     *
     * @return \DateTime
     */
    public function getDatereservation()
    {
        return $this->datereservation;
    }

    /**
     * Set heuredebut
     *
     * @param \DateTime $heuredebut
     *
     * @return Reservation
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
     * @return Reservation
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
     * Set remarquereservation
     *
     * @param string $remarquereservation
     *
     * @return Reservation
     */
    public function setRemarquereservation($remarquereservation)
    {
        $this->remarquereservation = $remarquereservation;

        return $this;
    }

    /**
     * Get remarquereservation
     *
     * @return string
     */
    public function getRemarquereservation()
    {
        return $this->remarquereservation;
    }

    /**
     * Set commentaireclient
     *
     * @param string $commentaireclient
     *
     * @return Reservation
     */
    public function setCommentaireclient($commentaireclient)
    {
        $this->commentaireclient = $commentaireclient;

        return $this;
    }

    /**
     * Get commentaireclient
     *
     * @return string
     */
    public function getCommentaireclient()
    {
        return $this->commentaireclient;
    }

    /**
     * Get idreservation
     *
     * @return integer
     */
    public function getIdreservation()
    {
        return $this->idreservation;
    }

    /**
     * Set idfermeture
     *
     * @param \AppBundle\Entity\FermetureDuCafe $idfermeture
     *
     * @return Reservation
     */
    public function setIdfermeture(\AppBundle\Entity\FermetureDuCafe $idfermeture = null)
    {
        $this->idfermeture = $idfermeture;

        return $this;
    }

    /**
     * Get idfermeture
     *
     * @return \AppBundle\Entity\FermetureDuCafe
     */
    public function getIdfermeture()
    {
        return $this->idfermeture;
    }

    /**
     * Set idmagasin
     *
     * @param \AppBundle\Entity\Magasin $idmagasin
     *
     * @return Reservation
     */
    public function setIdmagasin(\AppBundle\Entity\Magasin $idmagasin = null)
    {
        $this->idmagasin = $idmagasin;

        return $this;
    }

    /**
     * Get idmagasin
     *
     * @return \AppBundle\Entity\Magasin
     */
    public function getIdmagasin()
    {
        return $this->idmagasin;
    }

    /**
     * Set idmodepaiement
     *
     * @param \AppBundle\Entity\ModeDePaiement $idmodepaiement
     *
     * @return Reservation
     */
    public function setIdmodepaiement(\AppBundle\Entity\ModeDePaiement $idmodepaiement = null)
    {
        $this->idmodepaiement = $idmodepaiement;

        return $this;
    }

    /**
     * Get idmodepaiement
     *
     * @return \AppBundle\Entity\ModeDePaiement
     */
    public function getIdmodepaiement()
    {
        return $this->idmodepaiement;
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

    /**
     * Set idpersonne
     *
     * @param \AppBundle\Entity\Personne $idpersonne
     *
     * @return Reservation
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
