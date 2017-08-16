<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * JoursOuvert
 *
 * @ORM\Table(name="Jours_Ouvert")
 * @ORM\Entity
 */
class JoursOuvert
{
    /**
     * @var integer
     *
     * @ORM\Column(name="jours", type="integer", nullable=true)
     */
    private $jours;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="heureDebut", type="date", nullable=true)
     */
    private $heuredebut;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="heureFin", type="date", nullable=true)
     */
    private $heurefin;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=255, nullable=true)
     */
    private $titre;

    /**
     * @var integer
     *
     * @ORM\Column(name="idOuverture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idouverture;


}

