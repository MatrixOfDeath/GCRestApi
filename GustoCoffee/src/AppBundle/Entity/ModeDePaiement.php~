<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ModeDePaiement
 *
 * @ORM\Table(name="Mode_de_Paiement", indexes={@ORM\Index(name="modePaiement", columns={"modePaiement"})})
 * @ORM\Entity
 */
class ModeDePaiement
{
    /**
     * @var string
     *
     * @ORM\Column(name="modePaiement", type="string", length=25, nullable=true)
     */
    private $modepaiement;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=25, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="idModePaiement", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmodepaiement;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Facture", mappedBy="idmodepaiement")
     */
    private $idfacture;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idfacture = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

