<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Magasin
 *
 * @ORM\Table(name="Magasin", uniqueConstraints={@ORM\UniqueConstraint(name="nomMagasin", columns={"nomMagasin"})})
 * @ORM\Entity
 */
class Magasin
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomMagasin", type="string", length=25, nullable=true)
     */
    private $nommagasin;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse", type="string", length=25, nullable=true)
     */
    private $adresse;

    /**
     * @var integer
     *
     * @ORM\Column(name="idMagasin", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmagasin;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Salle", inversedBy="idmagasin")
     * @ORM\JoinTable(name="choisir",
     *   joinColumns={
     *     @ORM\JoinColumn(name="idMagasin", referencedColumnName="idMagasin")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="idSalle", referencedColumnName="idSalle")
     *   }
     * )
     */
    private $idsalle;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idsalle = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

