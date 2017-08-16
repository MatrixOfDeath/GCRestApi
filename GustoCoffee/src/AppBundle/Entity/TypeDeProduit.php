<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TypeDeProduit
 *
 * @ORM\Table(name="Type_de_Produit")
 * @ORM\Entity
 */
class TypeDeProduit
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomType", type="string", length=25, nullable=true)
     */
    private $nomtype;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="idTypeProduit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idtypeproduit;



    /**
     * Set nomtype
     *
     * @param string $nomtype
     *
     * @return TypeDeProduit
     */
    public function setNomtype($nomtype)
    {
        $this->nomtype = $nomtype;

        return $this;
    }

    /**
     * Get nomtype
     *
     * @return string
     */
    public function getNomtype()
    {
        return $this->nomtype;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return TypeDeProduit
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
     * Get idtypeproduit
     *
     * @return integer
     */
    public function getIdtypeproduit()
    {
        return $this->idtypeproduit;
    }
}
