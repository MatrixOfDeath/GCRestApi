<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Produit
 *
 * @ORM\Table(name="Produit", indexes={@ORM\Index(name="quantiteEnStock", columns={"quantiteEnStock"}), @ORM\Index(name="FK_Produit_idTypeProduit", columns={"idTypeProduit"}), @ORM\Index(name="FK_Produit_idStatutProduit", columns={"idStatutProduit"})})
 * @ORM\Entity
 */
class Produit
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomProduit", type="string", length=25, nullable=true)
     */
    private $nomproduit;

    /**
     * @var float
     *
     * @ORM\Column(name="prixProduit", type="float", precision=10, scale=0, nullable=true)
     */
    private $prixproduit;

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
     * @ORM\Column(name="statutProduit", type="integer", nullable=true)
     */
    private $statutproduit;

    /**
     * @var integer
     *
     * @ORM\Column(name="idProduit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idproduit;

    /**
     * @var \AppBundle\Entity\StatutProduit
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\StatutProduit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idStatutProduit", referencedColumnName="idStatutProduit")
     * })
     */
    private $idstatutproduit;

    /**
     * @var \AppBundle\Entity\TypeDeProduit
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\TypeDeProduit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idTypeProduit", referencedColumnName="idTypeProduit")
     * })
     */
    private $idtypeproduit;



    /**
     * Set nomproduit
     *
     * @param string $nomproduit
     *
     * @return Produit
     */
    public function setNomproduit($nomproduit)
    {
        $this->nomproduit = $nomproduit;

        return $this;
    }

    /**
     * Get nomproduit
     *
     * @return string
     */
    public function getNomproduit()
    {
        return $this->nomproduit;
    }

    /**
     * Set prixproduit
     *
     * @param float $prixproduit
     *
     * @return Produit
     */
    public function setPrixproduit($prixproduit)
    {
        $this->prixproduit = $prixproduit;

        return $this;
    }

    /**
     * Get prixproduit
     *
     * @return float
     */
    public function getPrixproduit()
    {
        return $this->prixproduit;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Produit
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
     * @return Produit
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
     * Set statutproduit
     *
     * @param integer $statutproduit
     *
     * @return Produit
     */
    public function setStatutproduit($statutproduit)
    {
        $this->statutproduit = $statutproduit;

        return $this;
    }

    /**
     * Get statutproduit
     *
     * @return integer
     */
    public function getStatutproduit()
    {
        return $this->statutproduit;
    }

    /**
     * Get idproduit
     *
     * @return integer
     */
    public function getIdproduit()
    {
        return $this->idproduit;
    }

    /**
     * Set idstatutproduit
     *
     * @param \AppBundle\Entity\StatutProduit $idstatutproduit
     *
     * @return Produit
     */
    public function setIdstatutproduit(\AppBundle\Entity\StatutProduit $idstatutproduit = null)
    {
        $this->idstatutproduit = $idstatutproduit;

        return $this;
    }

    /**
     * Get idstatutproduit
     *
     * @return \AppBundle\Entity\StatutProduit
     */
    public function getIdstatutproduit()
    {
        return $this->idstatutproduit;
    }

    /**
     * Set idtypeproduit
     *
     * @param \AppBundle\Entity\TypeDeProduit $idtypeproduit
     *
     * @return Produit
     */
    public function setIdtypeproduit(\AppBundle\Entity\TypeDeProduit $idtypeproduit = null)
    {
        $this->idtypeproduit = $idtypeproduit;

        return $this;
    }

    /**
     * Get idtypeproduit
     *
     * @return \AppBundle\Entity\TypeDeProduit
     */
    public function getIdtypeproduit()
    {
        return $this->idtypeproduit;
    }
}
