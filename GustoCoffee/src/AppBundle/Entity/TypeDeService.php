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


    /**
     * Set nomservice
     *
     * @param string $nomservice
     *
     * @return TypeDeService
     */
    public function setNomservice($nomservice)
    {
        $this->nomservice = $nomservice;

        return $this;
    }

    /**
     * Get nomservice
     *
     * @return string
     */
    public function getNomservice()
    {
        return $this->nomservice;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return TypeDeService
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Get idtypeservice
     *
     * @return integer
     */
    public function getIdtypeservice()
    {
        return $this->idtypeservice;
    }

    /**
     * Add idservice
     *
     * @param \AppBundle\Entity\Service $idservice
     *
     * @return TypeDeService
     */
    public function addIdservice(\AppBundle\Entity\Service $idservice)
    {
        $this->idservice[] = $idservice;

        return $this;
    }

    /**
     * Remove idservice
     *
     * @param \AppBundle\Entity\Service $idservice
     */
    public function removeIdservice(\AppBundle\Entity\Service $idservice)
    {
        $this->idservice->removeElement($idservice);
    }

    /**
     * Get idservice
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdservice()
    {
        return $this->idservice;
    }
}
