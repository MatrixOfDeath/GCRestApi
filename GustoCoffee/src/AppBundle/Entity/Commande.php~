<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Commande
 *
 * @ORM\Table(name="Commande", indexes={@ORM\Index(name="FK_Commande_idPersonne", columns={"idPersonne"}), @ORM\Index(name="FK_Commande_idModePaiement", columns={"idModePaiement"}), @ORM\Index(name="FK_Commande_idDemandeProduit", columns={"idDemandeProduit"})})
 * @ORM\Entity
 */
class Commande
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateCommande", type="date", nullable=false)
     */
    private $datecommande;

    /**
     * @var integer
     *
     * @ORM\Column(name="idCommande", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idcommande;

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
     * @var \AppBundle\Entity\Personne
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Personne")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idPersonne", referencedColumnName="idPersonne")
     * })
     */
    private $idpersonne;


}

