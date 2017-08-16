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


}

