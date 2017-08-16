<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Produitfourni
 *
 * @ORM\Table(name="ProduitFourni", indexes={@ORM\Index(name="FK_ProduitFourni_idDemandeProduit", columns={"idDemandeProduit"}), @ORM\Index(name="FK_ProduitFourni_idProduit_1", columns={"idProduit_1"})})
 * @ORM\Entity
 */
class Produitfourni
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idProduit", type="integer", nullable=true)
     */
    private $idproduit;

    /**
     * @var integer
     *
     * @ORM\Column(name="idFournisseur", type="integer", nullable=true)
     */
    private $idfournisseur;

    /**
     * @var integer
     *
     * @ORM\Column(name="idDemande", type="integer", nullable=true)
     */
    private $iddemande;

    /**
     * @var integer
     *
     * @ORM\Column(name="idFournisseur_2", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $idfournisseur2;

    /**
     * @var \AppBundle\Entity\DemandeProduit
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\DemandeProduit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idDemandeProduit", referencedColumnName="idDemandeProduit")
     * })
     */
    private $iddemandeproduit;

    /**
     * @var \AppBundle\Entity\Produit
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Produit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idProduit_1", referencedColumnName="idProduit")
     * })
     */
    private $idproduit1;



    /**
     * Set idproduit
     *
     * @param integer $idproduit
     *
     * @return Produitfourni
     */
    public function setIdproduit($idproduit)
    {
        $this->idproduit = $idproduit;

        return $this;
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
     * Set idfournisseur
     *
     * @param integer $idfournisseur
     *
     * @return Produitfourni
     */
    public function setIdfournisseur($idfournisseur)
    {
        $this->idfournisseur = $idfournisseur;

        return $this;
    }

    /**
     * Get idfournisseur
     *
     * @return integer
     */
    public function getIdfournisseur()
    {
        return $this->idfournisseur;
    }

    /**
     * Set iddemande
     *
     * @param integer $iddemande
     *
     * @return Produitfourni
     */
    public function setIddemande($iddemande)
    {
        $this->iddemande = $iddemande;

        return $this;
    }

    /**
     * Get iddemande
     *
     * @return integer
     */
    public function getIddemande()
    {
        return $this->iddemande;
    }

    /**
     * Set idfournisseur2
     *
     * @param integer $idfournisseur2
     *
     * @return Produitfourni
     */
    public function setIdfournisseur2($idfournisseur2)
    {
        $this->idfournisseur2 = $idfournisseur2;

        return $this;
    }

    /**
     * Get idfournisseur2
     *
     * @return integer
     */
    public function getIdfournisseur2()
    {
        return $this->idfournisseur2;
    }

    /**
     * Set iddemandeproduit
     *
     * @param \AppBundle\Entity\DemandeProduit $iddemandeproduit
     *
     * @return Produitfourni
     */
    public function setIddemandeproduit(\AppBundle\Entity\DemandeProduit $iddemandeproduit)
    {
        $this->iddemandeproduit = $iddemandeproduit;

        return $this;
    }

    /**
     * Get iddemandeproduit
     *
     * @return \AppBundle\Entity\DemandeProduit
     */
    public function getIddemandeproduit()
    {
        return $this->iddemandeproduit;
    }

    /**
     * Set idproduit1
     *
     * @param \AppBundle\Entity\Produit $idproduit1
     *
     * @return Produitfourni
     */
    public function setIdproduit1(\AppBundle\Entity\Produit $idproduit1)
    {
        $this->idproduit1 = $idproduit1;

        return $this;
    }

    /**
     * Get idproduit1
     *
     * @return \AppBundle\Entity\Produit
     */
    public function getIdproduit1()
    {
        return $this->idproduit1;
    }
}
