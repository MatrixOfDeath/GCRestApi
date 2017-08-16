<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Service
 *
 * @ORM\Table(name="Service", indexes={@ORM\Index(name="quantiteEnStock", columns={"quantiteEnStock"}), @ORM\Index(name="FK_Service_idStatutService", columns={"idStatutService"})})
 * @ORM\Entity
 */
class Service
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomService", type="string", length=25, nullable=true)
     */
    private $nomservice;

    /**
     * @var float
     *
     * @ORM\Column(name="prixService", type="float", precision=10, scale=0, nullable=true)
     */
    private $prixservice;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="quantiteEnStock", type="integer", nullable=true)
     */
    private $quantiteenstock;

    /**
     * @var integer
     *
     * @ORM\Column(name="statutService", type="integer", nullable=true)
     */
    private $statutservice;

    /**
     * @var integer
     *
     * @ORM\Column(name="idService", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idservice;

    /**
     * @var \AppBundle\Entity\StatutService
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\StatutService")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idStatutService", referencedColumnName="idStatutService")
     * })
     */
    private $idstatutservice;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\TypeDeService", mappedBy="idservice")
     */
    private $idtypeservice;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idtypeservice = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

