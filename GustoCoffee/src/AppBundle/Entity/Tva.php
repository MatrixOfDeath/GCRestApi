<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tva
 *
 * @ORM\Table(name="Tva")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TvaRepository")
 */
class Tva
{

    /**
     * @var integer
     *
     * @ORM\Column(name="idTva", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idtva;

    /**
     * @var float
     *
     * @ORM\Column(name="tauxTva", type="float", precision=10, scale=0, nullable=true)
     */
    private $tauxtva;

    /**
     * @var string
     *
     * @ORM\Column(name="codeTva", type="string", length=25, nullable=true)
     */
    private $codetva;


    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=125)
     */
    private $nom;

    /**
     * @var float
     *
     * @ORM\Column(name="valeur", type="float")
     */
    private $valeur;

    /**
     * @var float
     *
     * @ORM\Column(name="multiplicate", type="float")
     */
    private $multiplicate;

    /**
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Produit", mappedBy="idtva")
     *
     */
    private $produits;

    /**
     * @return mixed
     */
    public function getTva()
    {
        return $this->produits;
    }

    /**
     * @param mixed $produits
     */
    public function setTva($produits)
    {
        $this->produits = $produits;
    }

    /**
     * Set valeur
     *
     * @param float $valeur
     * @return Tva
     */
    public function setValeur($valeur)
    {
        $this->valeur = $valeur;

        return $this;
    }

    /**
     * Get valeur
     *
     * @return float
     */
    public function getValeur()
    {
        return $this->valeur;
    }

    /**
     * Set nom
     *
     * @param string $nom
     * @return Tva
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getNom();
    }

    /**
     * Set tauxtva
     *
     * @param float $tauxtva
     *
     * @return Tva
     */
    public function setTauxtva($tauxtva)
    {
        $this->tauxtva = $tauxtva;

        return $this;
    }

    /**
     * Get tauxtva
     *
     * @return float
     */
    public function getTauxtva()
    {
        return $this->tauxtva;
    }

    /**
     * Set codetva
     *
     * @param string $codetva
     *
     * @return Tva
     */
    public function setCodetva($codetva)
    {
        $this->codetva = $codetva;

        return $this;
    }

    /**
     * Get codetva
     *
     * @return string
     */
    public function getCodetva()
    {
        return $this->codetva;
    }

    /**
     * Get idtva
     *
     * @return integer
     */
    public function getIdtva()
    {
        return $this->idtva;
    }


    /**
     * Set multiplicate
     *
     * @param float $multiplicate
     * @return Tva
     */
    public function setMultiplicate($multiplicate)
    {
        $this->multiplicate = $multiplicate;

        return $this;
    }

    /**
     * Get multiplicate
     *
     * @return float
     */
    public function getMultiplicate()
    {
        return $this->multiplicate;
    }


}
