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


    /**
     * Set nomservice
     *
     * @param string $nomservice
     *
     * @return Service
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
     * Set prixservice
     *
     * @param float $prixservice
     *
     * @return Service
     */
    public function setPrixservice($prixservice)
    {
        $this->prixservice = $prixservice;

        return $this;
    }

    /**
     * Get prixservice
     *
     * @return float
     */
    public function getPrixservice()
    {
        return $this->prixservice;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Service
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
     * Set quantiteenstock
     *
     * @param integer $quantiteenstock
     *
     * @return Service
     */
    public function setQuantiteenstock($quantiteenstock)
    {
        $this->quantiteenstock = $quantiteenstock;

        return $this;
    }

    /**
     * Get quantiteenstock
     *
     * @return integer
     */
    public function getQuantiteenstock()
    {
        return $this->quantiteenstock;
    }

    /**
     * Set statutservice
     *
     * @param integer $statutservice
     *
     * @return Service
     */
    public function setStatutservice($statutservice)
    {
        $this->statutservice = $statutservice;

        return $this;
    }

    /**
     * Get statutservice
     *
     * @return integer
     */
    public function getStatutservice()
    {
        return $this->statutservice;
    }

    /**
     * Get idservice
     *
     * @return integer
     */
    public function getIdservice()
    {
        return $this->idservice;
    }

    /**
     * Set idstatutservice
     *
     * @param \AppBundle\Entity\StatutService $idstatutservice
     *
     * @return Service
     */
    public function setIdstatutservice(\AppBundle\Entity\StatutService $idstatutservice = null)
    {
        $this->idstatutservice = $idstatutservice;

        return $this;
    }

    /**
     * Get idstatutservice
     *
     * @return \AppBundle\Entity\StatutService
     */
    public function getIdstatutservice()
    {
        return $this->idstatutservice;
    }

    /**
     * Add idtypeservice
     *
     * @param \AppBundle\Entity\TypeDeService $idtypeservice
     *
     * @return Service
     */
    public function addIdtypeservice(\AppBundle\Entity\TypeDeService $idtypeservice)
    {
        $this->idtypeservice[] = $idtypeservice;

        return $this;
    }

    /**
     * Remove idtypeservice
     *
     * @param \AppBundle\Entity\TypeDeService $idtypeservice
     */
    public function removeIdtypeservice(\AppBundle\Entity\TypeDeService $idtypeservice)
    {
        $this->idtypeservice->removeElement($idtypeservice);
    }

    /**
     * Get idtypeservice
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdtypeservice()
    {
        return $this->idtypeservice;
    }
}
