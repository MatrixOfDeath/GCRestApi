<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Annonce
 *
 * @ORM\Table(name="Annonce", indexes={@ORM\Index(name="FK_Annonce_idPersonne", columns={"idPersonne"})})
 * @ORM\Entity
 */
class Annonce
{
    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=25, nullable=true)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="corps", type="text", length=65535, nullable=true)
     */
    private $corps;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateCreation", type="date", nullable=true)
     */
    private $datecreation;

    /**
     * @var integer
     *
     * @ORM\Column(name="idAnnonce", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idannonce;

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

