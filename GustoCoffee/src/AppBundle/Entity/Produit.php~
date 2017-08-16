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


}

