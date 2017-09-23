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
     * @ORM\GeneratedValue(strategy="IDENTITY")
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


    /**
     * Set quantite
     *
     * @param integer $quantite
     *
     * @return LigneDeCommande
     */
    public function setQuantite($quantite)
    {
        $this->quantite = $quantite;

        return $this;
    }

    /**
     * Get quantite
     *
     * @return integer
     */
    public function getQuantite()
    {
        return $this->quantite;
    }

    /**
     * Set referenceemploye
     *
     * @param integer $referenceemploye
     *
     * @return LigneDeCommande
     */
    public function setReferenceemploye($referenceemploye)
    {
        $this->referenceemploye = $referenceemploye;

        return $this;
    }

    /**
     * Get referenceemploye
     *
     * @return integer
     */
    public function getReferenceemploye()
    {
        return $this->referenceemploye;
    }

    /**
     * Set idlignedecommande
     *
     * @param integer $idlignedecommande
     *
     * @return LigneDeCommande
     */
    public function setIdlignedecommande($idlignedecommande)
    {
        $this->idlignedecommande = $idlignedecommande;

        return $this;
    }

    /**
     * Get idlignedecommande
     *
     * @return integer
     */
    public function getIdlignedecommande()
    {
        return $this->idlignedecommande;
    }

    /**
     * Set idcommande
     *
     * @param \AppBundle\Entity\Commande $idcommande
     *
     * @return LigneDeCommande
     */
    public function setIdcommande(\AppBundle\Entity\Commande $idcommande)
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
     * @return LigneDeCommande
     */
    public function setIdreservation(\AppBundle\Entity\Reservation $idreservation)
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
}
