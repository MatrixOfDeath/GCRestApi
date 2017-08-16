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
     *   @ORM\JoinColumn(name="idPersonne", referencedColumnName="idPersonne")
     * })
     */
    private $idpersonne;


}

