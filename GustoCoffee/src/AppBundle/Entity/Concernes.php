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



    /**
     * Set idcommande
     *
     * @param \AppBundle\Entity\Commande $idcommande
     *
     * @return Concernes
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
     * Set idlignedecommande
     *
     * @param \AppBundle\Entity\LigneDeCommande $idlignedecommande
     *
     * @return Concernes
     */
    public function setIdlignedecommande(\AppBundle\Entity\LigneDeCommande $idlignedecommande)
    {
        $this->idlignedecommande = $idlignedecommande;

        return $this;
    }

    /**
     * Get idlignedecommande
     *
     * @return \AppBundle\Entity\LigneDeCommande
     */
    public function getIdlignedecommande()
    {
        return $this->idlignedecommande;
    }

    /**
     * Set idreservation
     *
     * @param \AppBundle\Entity\Reservation $idreservation
     *
     * @return Concernes
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

    /**
     * Set idservice
     *
     * @param \AppBundle\Entity\Service $idservice
     *
     * @return Concernes
     */
    public function setIdservice(\AppBundle\Entity\Service $idservice)
    {
        $this->idservice = $idservice;

        return $this;
    }

    /**
     * Get idservice
     *
     * @return \AppBundle\Entity\Service
     */
    public function getIdservice()
    {
        return $this->idservice;
    }
}
