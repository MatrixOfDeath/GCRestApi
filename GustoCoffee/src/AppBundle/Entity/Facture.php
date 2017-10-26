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
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Transaction", mappedBy="commande")
     */
    private $transaction;

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
        $this->idmodepaiement = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set datefacturation
     *
     * @param \DateTime $datefacturation
     *
     * @return Facture
     */
    public function setDatefacturation($datefacturation)
    {
        $this->datefacturation = $datefacturation;

        return $this;
    }

    /**
     * Get datefacturation
     *
     * @return \DateTime
     */
    public function getDatefacturation()
    {
        return $this->datefacturation;
    }

    /**
     * Set nomfichierfacture
     *
     * @param string $nomfichierfacture
     *
     * @return Facture
     */
    public function setNomfichierfacture($nomfichierfacture)
    {
        $this->nomfichierfacture = $nomfichierfacture;

        return $this;
    }

    /**
     * Get nomfichierfacture
     *
     * @return string
     */
    public function getNomfichierfacture()
    {
        return $this->nomfichierfacture;
    }

    /**
     * Get idfacture
     *
     * @return integer
     */
    public function getIdfacture()
    {
        return $this->idfacture;
    }

    /**
     * Set idcommande
     *
     * @param \AppBundle\Entity\Commande $idcommande
     *
     * @return Facture
     */
    public function setIdcommande(\AppBundle\Entity\Commande $idcommande = null)
    {
        $this->idcommande = $idcommande;

        return $this;
    }

    /**
     * Get idcommande
     *
     * @return \AppBundle\Entity\Commande
     */
    public function getIdcommande()
    {
        return $this->idcommande;
    }

    /**
     * Set idreservation
     *
     * @param \AppBundle\Entity\Reservation $idreservation
     *
     * @return Facture
     */
    public function setIdreservation(\AppBundle\Entity\Reservation $idreservation = null)
    {
        $this->idreservation = $idreservation;

        return $this;
    }

    /**
     * Get idreservation
     *
     * @return \AppBundle\Entity\Reservation
     */
    public function getIdreservation()
    {
        return $this->idreservation;
    }

    /**
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTransaction()
    {
        return $this->transaction;
    }

    /**
     * @param \Doctrine\Common\Collections\Collection $transaction
     */
    public function setTransaction($transaction)
    {
        $this->transaction = $transaction;
    }


    /**
     * Get idtransaction
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdtransaction()
    {
        return $this->idtransaction;
    }

    /**
     * Add idmodepaiement
     *
     * @param \AppBundle\Entity\ModeDePaiement $idmodepaiement
     *
     * @return Facture
     */
    public function addIdmodepaiement(\AppBundle\Entity\ModeDePaiement $idmodepaiement)
    {
        $this->idmodepaiement[] = $idmodepaiement;

        return $this;
    }

    /**
     * Remove idmodepaiement
     *
     * @param \AppBundle\Entity\ModeDePaiement $idmodepaiement
     */
    public function removeIdmodepaiement(\AppBundle\Entity\ModeDePaiement $idmodepaiement)
    {
        $this->idmodepaiement->removeElement($idmodepaiement);
    }

    /**
     * Get idmodepaiement
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdmodepaiement()
    {
        return $this->idmodepaiement;
    }
}
