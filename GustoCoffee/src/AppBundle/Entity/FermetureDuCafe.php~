<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FermetureDuCafe
 *
 * @ORM\Table(name="Fermeture_du_Cafe", indexes={@ORM\Index(name="dateDebut", columns={"dateDebut", "dateFin"})})
 * @ORM\Entity
 */
class FermetureDuCafe
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateDebut", type="date", nullable=true)
     */
    private $datedebut;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateFin", type="date", nullable=true)
     */
    private $datefin;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255, nullable=true)
     */
    private $titre;

    /**
     * @var string
     *
     * @ORM\Column(name="raison", type="text", length=255, nullable=true)
     */
    private $raison;

    /**
     * @var string
     *
     * @ORM\Column(name="jourFerie", type="string", length=25, nullable=true)
     */
    private $jourferie;

    /**
     * @var integer
     *
     * @ORM\Column(name="idFermeture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idfermeture;


}

