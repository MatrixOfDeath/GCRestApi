<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Place
 *
 * @ORM\Table(name="Place", indexes={@ORM\Index(name="nomPlace", columns={"nomPlace", "statutPlace"}), @ORM\Index(name="FK_Place_idSalle", columns={"idSalle"})})
 * @ORM\Entity
 */
class Place
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomPlace", type="string", length=25, nullable=true)
     */
    private $nomplace;

    /**
     * @var string
     *
     * @ORM\Column(name="statutPlace", type="string", length=25, nullable=true)
     */
    private $statutplace;

    /**
     * @var integer
     *
     * @ORM\Column(name="idPlace", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idplace;

    /**
     * @var \AppBundle\Entity\Salle
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Salle")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idSalle", referencedColumnName="idSalle")
     * })
     */
    private $idsalle;



    /**
     * Set nomplace
     *
     * @param string $nomplace
     *
     * @return Place
     */
    public function setNomplace($nomplace)
    {
        $this->nomplace = $nomplace;

        return $this;
    }

    /**
     * Get nomplace
     *
     * @return string
     */
    public function getNomplace()
    {
        return $this->nomplace;
    }

    /**
     * Set statutplace
     *
     * @param string $statutplace
     *
     * @return Place
     */
    public function setStatutplace($statutplace)
    {
        $this->statutplace = $statutplace;

        return $this;
    }

    /**
     * Get statutplace
     *
     * @return string
     */
    public function getStatutplace()
    {
        return $this->statutplace;
    }

    /**
     * Get idplace
     *
     * @return integer
     */
    public function getIdplace()
    {
        return $this->idplace;
    }

    /**
     * Set idsalle
     *
     * @param \AppBundle\Entity\Salle $idsalle
     *
     * @return Place
     */
    public function setIdsalle(\AppBundle\Entity\Salle $idsalle = null)
    {
        $this->idsalle = $idsalle;

        return $this;
    }

    /**
     * Get idsalle
     *
     * @return \AppBundle\Entity\Salle
     */
    public function getIdsalle()
    {
        return $this->idsalle;
    }
}
