<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Concernes
 *
 * @ORM\Table(name="ConcerneS", indexes={@ORM\Index(name="FK_ConcerneS_idLigneDeCommande", columns={"idLigneDeCommande"}), @ORM\Index(name="FK_ConcerneS_idCommande", columns={"idCommande"}), @ORM\Index(name="FK_ConcerneS_idReservation", columns={"idReservation"}), @ORM\Index(name="IDX_65713A9BF124F120", columns={"idService"})})
 * @ORM\Entity
 */
class Concernes
{
    /**
     * @var \AppBundle\Entity\Commande
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Commande")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idCommande", referencedColumnName="idCommande")
     * })
     */
    private $idcommande;

    /**
     * @var \AppBundle\Entity\LigneDeCommande
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\LigneDeCommande")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idLigneDeCommande", referencedColumnName="idLigneDeCommande")
     * })
     */
    private $idlignedecommande;

    /**
     * @var \AppBundle\Entity\Reservation
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Reservation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idReservation", referencedColumnName="idReservation")
     * })
     */
    private $idreservation;

    /**
     * @var \AppBundle\Entity\Service
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Service")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idService", referencedColumnName="idService")
     * })
     */
    private $idservice;


}

