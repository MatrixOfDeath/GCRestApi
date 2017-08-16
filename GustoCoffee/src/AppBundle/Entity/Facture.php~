<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Facture
 *
 * @ORM\Table(name="Facture", indexes={@ORM\Index(name="FK_Facture_idCommande", columns={"idCommande"}), @ORM\Index(name="FK_Facture_idReservation", columns={"idReservation"})})
 * @ORM\Entity
 */
class Facture
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateFacturation", type="date", nullable=true)
     */
    private $datefacturation;

    /**
     * @var string
     *
     * @ORM\Column(name="nomFichierFacture", type="string", length=25, nullable=true)
     */
    private $nomfichierfacture;

    /**
     * @var integer
     *
     * @ORM\Column(name="idFacture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idfacture;

    /**
     * @var \AppBundle\Entity\Commande
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Commande")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idCommande", referencedColumnName="idCommande")
     * })
     */
    private $idcommande;

    /**
     * @var \AppBundle\Entity\Reservation
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Reservation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idReservation", referencedColumnName="idReservation")
     * })
     */
    private $idreservation;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Transaction", mappedBy="idfacture")
     */
    private $idtransaction;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\ModeDePaiement", inversedBy="idfacture")
     * @ORM\JoinTable(name="utiliser",
     *   joinColumns={
     *     @ORM\JoinColumn(name="idFacture", referencedColumnName="idFacture")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="idModePaiement", referencedColumnName="idModePaiement")
     *   }
     * )
     */
    private $idmodepaiement;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idtransaction = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idmodepaiement = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

