<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * StatutService
 *
 * @ORM\Table(name="Statut_Service", indexes={@ORM\Index(name="statutService", columns={"statutService"})})
 * @ORM\Entity
 */
class StatutService
{
    /**
     * @var string
     *
     * @ORM\Column(name="statutService", type="string", length=25, nullable=true)
     */
    private $statutservice;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="idStatutService", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idstatutservice;



    /**
     * Set statutservice
     *
     * @param string $statutservice
     *
     * @return StatutService
     */
    public function setStatutservice($statutservice)
    {
        $this->statutservice = $statutservice;

        return $this;
    }

    /**
     * Get statutservice
     *
     * @return string
     */
    public function getStatutservice()
    {
        return $this->statutservice;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return StatutService
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
     * Get idstatutservice
     *
     * @return integer
     */
    public function getIdstatutservice()
    {
        return $this->idstatutservice;
    }
}
