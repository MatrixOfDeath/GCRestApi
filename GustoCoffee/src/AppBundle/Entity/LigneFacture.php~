<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LigneFacture
 *
 * @ORM\Table(name="Ligne_Facture", indexes={@ORM\Index(name="FK_Ligne_Facture_idFacture", columns={"idFacture"}), @ORM\Index(name="FK_Ligne_Facture_idTva", columns={"idTva"})})
 * @ORM\Entity
 */
class LigneFacture
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idLigneFacture", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idlignefacture;

    /**
     * @var \AppBundle\Entity\Facture
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Facture")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idFacture", referencedColumnName="idFacture")
     * })
     */
    private $idfacture;

    /**
     * @var \AppBundle\Entity\Tva
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tva")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idTva", referencedColumnName="idTva")
     * })
     */
    private $idtva;


}

