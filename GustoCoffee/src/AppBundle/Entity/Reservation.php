<?php

namespace AppBundle\Entity;

use AppBundle\Form\ReservationType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Date;

/**
 * Reservation
 *
 * @ORM\Table(name="Reservation", indexes={
 *     @ORM\Index(name="FK_Reservation_idPersonne", columns={"idPersonne"}),
 *     @ORM\Index(name="FK_Reservation_idModePaiement", columns={"idModePaiement"}),
 * })
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class Reservation
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idReservation", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idreservation;

    /**
     * @var \AppBundle\Entity\Salle
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Salle", inversedBy="reservation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idSalle", referencedColumnName="idSalle")
     * })
     */
    private $idsalle;


    /**
     * @var \AppBundle\Entity\Place
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Place", inversedBy="reservation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idPlace", referencedColumnName="idPlace")
     * })
     */
    private $idplace;
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateReservation", type="datetime", nullable=true)
     */
    private $datereservation;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="heureDebut", type="datetime", nullable=true)
     */
    private $heuredebut;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="heureFin", type="datetime", nullable=true)
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
     * @var \AppBundle\Entity\ModeDePaiement
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\ModeDePaiement")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idModePaiement", referencedColumnName="idModePaiement")
     * })
     */
    private $idmodepaiement;

    /**
     * @var boolean
     * @ORM\Column(name="statut", type="boolean", nullable=true)
     */
    private $statut;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Commande", mappedBy="reservation")
     */
    private $commandes;

    /**
     * @return mixed
     */
    public function getCommandes()
    {
        return $this->commandes;
    }

    /**
     * @param mixed $commandes
     */
    public function setCommandes($commandes)
    {
        $this->commandes = $commandes;
    }

    /**
     * @return bool
     */
    public function isStatut()
    {
        return $this->statut;
    }

    /**
     * @param bool $statut
     */
    public function setStatut($statut)
    {
        $this->statut = $statut;
    }

    /**
     * @var \AppBundle\Entity\Personne
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Personne")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idPersonne", referencedColumnName="id")
     * })
     */
    private $idpersonne;


    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     * @var \DateTime
     */
    private $updatedAt;


    /**
     * created Time/Date
     *
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    protected $createdAt;

    /**
     * Set createdAt
     *
     * @ORM\PrePersist
     */
    public function setCreatedAt()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @ORM\PreUpdate
     */
    public function setUpdatedAt()
    {
        $this->updatedAt = new \DateTime();
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

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
     * @return Place
     */
    public function getIdplace()
    {
        return $this->idplace;
    }

    /**
     * @param Place $idplace
     */
    public function setIdplace($idplace)
    {
        $this->idplace = $idplace;
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
     * get idsalle
     * @return \AppBundle\Entity\Salle
     */
    public function getIdsalle()
    {
        return $this->idsalle;
    }

    /**
     * @param Salle $idsalle
     */
    public function setIdsalle($idsalle)
    {
        $this->idsalle = $idsalle;
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