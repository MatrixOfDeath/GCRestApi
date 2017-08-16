<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Concernep
 *
 * @ORM\Table(name="ConcerneP", indexes={@ORM\Index(name="FK_ConcerneP_idCommande", columns={"idCommande"}), @ORM\Index(name="FK_ConcerneP_idReservation", columns={"idReservation"}), @ORM\Index(name="FK_ConcerneP_idProduit", columns={"idProduit"}), @ORM\Index(name="IDX_FC786B217B326087", columns={"idLigneDeCommande"})})
 * @ORM\Entity
 */
class Concernep
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
     * @var \AppBundle\Entity\Produit
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Produit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idProduit", referencedColumnName="idProduit")
     * })
     */
    private $idproduit;

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

