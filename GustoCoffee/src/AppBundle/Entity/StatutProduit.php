<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * StatutProduit
 *
 * @ORM\Table(name="Statut_Produit", indexes={@ORM\Index(name="statutProduit", columns={"statutProduit"})})
 * @ORM\Entity
 */
class StatutProduit
{
    /**
     * @var string
     *
     * @ORM\Column(name="statutProduit", type="string", length=25, nullable=true)
     */
    private $statutproduit;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=255, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="idStatutProduit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idstatutproduit;



    /**
     * Set statutproduit
     *
     * @param string $statutproduit
     *
     * @return StatutProduit
     */
    public function setStatutproduit($statutproduit)
    {
        $this->statutproduit = $statutproduit;

        return $this;
    }

    /**
     * Get statutproduit
     *
     * @return string
     */
    public function getStatutproduit()
    {
        return $this->statutproduit;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return StatutProduit
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
     * Get idstatutproduit
     *
     * @return integer
     */
    public function getIdstatutproduit()
    {
        return $this->idstatutproduit;
    }
}
