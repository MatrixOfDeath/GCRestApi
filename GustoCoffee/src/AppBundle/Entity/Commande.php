<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Commande
 *
 * @ORM\Table(name="Commande", indexes={@ORM\Index(name="FK_Commande_idPersonne", columns={"idPersonne"}),
 * @ORM\Index(name="FK_Commande_idModePaiement", columns={"idModePaiement"}),
 * @ORM\Index(name="FK_Commande_idDemandeProduit", columns={"idDemandeProduit"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CommandeRepository")
 */
class Commande
{

    /**
     * @var integer
     *
     * @ORM\Column(name="idCommande", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idcommande;


    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Reservation", mappedBy="idcommande")
     */
    private $commande;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Personne", inversedBy="commandes")
     * @ORM\JoinColumn(nullable=true)
     */
    private $personnes;


    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateCommande", type="date", nullable=false)
     */
    private $datecommande;

    /**
     * @var \AppBundle\Entity\DemandeProduit
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\DemandeProduit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idDemandeProduit", referencedColumnName="idDemandeProduit")
     * })
     */
    private $iddemandeproduit;

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
     *
     * @ORM\Column(name="valider", type="boolean")
     */
    private $valider;

    /**
     * @var integer
     *
     * @ORM\Column(name="reference", type="integer")
     */
    private $reference;


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
     * Set valider
     *
     * @param boolean $valider
     * @return Commande
     */
    public function setValider($valider)
    {
        $this->valider = $valider;

        return $this;
    }

    /**
     * Get valider
     *
     * @return boolean
     */
    public function getValider()
    {
        return $this->valider;
    }

    /**
     * Set reference
     *
     * @param integer $reference
     * @return Commande
     */
    public function setReference($reference)
    {
        $this->reference = $reference;

        return $this;
    }

    /**
     * Get reference
     *
     * @return integer
     */
    public function getReference()
    {
        return $this->reference;
    }
    /**
     * Set datecommande
     *
     * @param \DateTime $datecommande
     *
     * @return Commande
     */
    public function setDatecommande($datecommande)
    {
        $this->datecommande = $datecommande;

        return $this;
    }

    /**
     * Get datecommande
     *
     * @return \DateTime
     */
    public function getDatecommande()
    {
        return $this->datecommande;
    }

    /**
     * Get idcommande
     *
     * @return integer
     */
    public function getIdcommande()
    {
        return $this->idcommande;
    }


    /**
     * Set commande
     *
     * @param array $commande
     * @return Commande
     */
    public function setCommande($commande)
    {
        $this->commande = $commande;

        return $this;
    }

    /**
     * Get commande
     *
     * @return array
     */
    public function getCommande()
    {
        return $this->commande;
    }

    /**
     * Set iddemandeproduit
     *
     * @param \AppBundle\Entity\DemandeProduit $iddemandeproduit
     *
     * @return Commande
     */
    public function setIddemandeproduit(\AppBundle\Entity\DemandeProduit $iddemandeproduit = null)
    {
        $this->iddemandeproduit = $iddemandeproduit;

        return $this;
    }

    /**
     * Get iddemandeproduit
     *
     * @return \AppBundle\Entity\DemandeProduit
     */
    public function getIddemandeproduit()
    {
        return $this->iddemandeproduit;
    }

    /**
     * Set idmodepaiement
     *
     * @param \AppBundle\Entity\ModeDePaiement $idmodepaiement
     *
     * @return Commande
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
     * Set idpersonne
     *
     * @param \AppBundle\Entity\Personne $idpersonne
     *
     * @return Commande
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

    /**
     * Set utilisateur
     *
     * @param \AppBundle\Entity\Personne $personne
     * @return Commande
     */
    public function setPersonne(\AppBundle\Entity\Personne $personne = null)
    {
        $this->personnes = $personne;

        return $this;
    }

    /**
     * Get utilisateur
     *
     * @return \AppBundle\Entity\Personne
     */
    public function getPersonne()
    {
        return $this->personnes;
    }
}
