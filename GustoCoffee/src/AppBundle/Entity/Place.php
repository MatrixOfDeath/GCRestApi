<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Place
 *
 * @ORM\Table(name="Place", indexes={
 *     @ORM\Index(name="nomPlace", columns={"nomPlace"}),
 *     @ORM\Index(name="statutPlace", columns={"statutPlace"}),
 *      @ORM\Index(name="FK_Place_idSalle", columns={"idSalle"})
 * })
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlacesRepository")
 */
class Place
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idPlace", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idplace;

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
     * @var string
     *
     * @ORM\Column(name="position", type="string", length=25, nullable=true)
     */
    private $position;

    /**
     * @var string
     *
     * @ORM\Column(name="colonne", type="string", length=25, nullable=true)
     */
    private $colonne;

    /**
     * @var string
     *
     * @ORM\Column(name="ligne", type="string", length=25, nullable=true)
     */
    private $ligne;

    /**
     * @return string
     */
    public function getColumn()
    {
        return $this->colonne;
    }

    /**
     * @param string $colonne
     */
    public function setColonne($colonne)
    {
        $this->colonne = $colonne;
    }

    /**
     * @return string
     */
    public function getLigne()
    {
        return $this->ligne;
    }

    /**
     * @param string $ligne
     */
    public function setLigne($ligne)
    {
        $this->ligne = $ligne;
    }

    /**
     * @return string
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @param string $position
     */
    public function setPosition($position)
    {
        $this->position = $position;
    }

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

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getNomplace();
    }
}
