<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LigneDeCommande
 *
 * @ORM\Table(name="Ligne_de_Commande", indexes={@ORM\Index(name="FK_Ligne_de_Commande_idCommande", columns={"idCommande"}), @ORM\Index(name="FK_Ligne_de_Commande_idReservation", columns={"idReservation"})})
 * @ORM\Entity
 */
class LigneDeCommande
{
    /**
     * @var integer
     *
     * @ORM\Column(name="quantite", type="integer", nullable=true)
     */
    private $quantite;

    /**
     * @var integer
     *
     * @ORM\Column(name="referenceEmploye", type="integer", nullable=true)
     */
    private $referenceemploye;

    /**
     * @var integer
     *
     * @ORM\Column(name="idLigneDeCommande", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $idlignedecommande;

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


}

