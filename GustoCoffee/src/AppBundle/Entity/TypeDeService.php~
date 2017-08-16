<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TypeDeService
 *
 * @ORM\Table(name="Type_de_Service", indexes={@ORM\Index(name="nomService", columns={"nomService"})})
 * @ORM\Entity
 */
class TypeDeService
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomService", type="string", length=25, nullable=true)
     */
    private $nomservice;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="idTypeService", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idtypeservice;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Service", inversedBy="idtypeservice")
     * @ORM\JoinTable(name="est_de",
     *   joinColumns={
     *     @ORM\JoinColumn(name="idTypeService", referencedColumnName="idTypeService")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="idService", referencedColumnName="idService")
     *   }
     * )
     */
    private $idservice;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idservice = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

