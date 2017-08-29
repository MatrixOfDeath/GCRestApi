<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DemandeProduit
 *
 * @ORM\Table(name="Demande_Produit", indexes={@ORM\Index(name="FK_Demande_Produit_idPersonne", columns={"idPersonne"})})
 * @ORM\Entity
 */
class DemandeProduit
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateDemande", type="date", nullable=true)
     */
    private $datedemande;

    /**
     * @var string
     *
     * @ORM\Column(name="remarque", type="text", length=255, nullable=true)
     */
    private $remarque;

    /**
     * @var integer
     *
     * @ORM\Column(name="idDemandeProduit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $iddemandeproduit;

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
     * Set datedemande
     *
     * @param \DateTime $datedemande
     *
     * @return DemandeProduit
     */
    public function setDatedemande($datedemande)
    {
        $this->datedemande = $datedemande;

        return $this;
    }

    /**
     * Get datedemande
     *
     * @return \DateTime
     */
    public function getDatedemande()
    {
        return $this->datedemande;
    }

    /**
     * Set remarque
     *
     * @param string $remarque
     *
     * @return DemandeProduit
     */
    public function setRemarque($remarque)
    {
        $this->remarque = $remarque;

        return $this;
    }

    /**
     * Get remarque
     *
     * @return string
     */
    public function getRemarque()
    {
        return $this->remarque;
    }

    /**
     * Get iddemandeproduit
     *
     * @return integer
     */
    public function getIddemandeproduit()
    {
        return $this->iddemandeproduit;
    }

    /**
     * Set idpersonne
     *
     * @param \AppBundle\Entity\Personne $idpersonne
     *
     * @return DemandeProduit
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
