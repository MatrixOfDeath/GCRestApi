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


}

