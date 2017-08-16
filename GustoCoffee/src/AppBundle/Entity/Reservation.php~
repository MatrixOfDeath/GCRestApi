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


}

