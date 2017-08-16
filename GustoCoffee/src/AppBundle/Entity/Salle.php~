<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Salle
 *
 * @ORM\Table(name="Salle", uniqueConstraints={@ORM\UniqueConstraint(name="nomSalle", columns={"nomSalle"})})
 * @ORM\Entity
 */
class Salle
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomSalle", type="string", length=25, nullable=true)
     */
    private $nomsalle;

    /**
     * @var integer
     *
     * @ORM\Column(name="capacityMax", type="integer", nullable=true)
     */
    private $capacitymax;

    /**
     * @var string
     *
     * @ORM\Column(name="nomPlace", type="string", length=25, nullable=true)
     */
    private $nomplace;

    /**
     * @var integer
     *
     * @ORM\Column(name="idSalle", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idsalle;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Magasin", mappedBy="idsalle")
     */
    private $idmagasin;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idmagasin = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

