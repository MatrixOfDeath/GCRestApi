<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LigneDeCommande
 *
 * @ORM\Table(name="Ligne_de_Commande")
 *
 * @ORM\Entity
 */
class LigneDeCommande
{
    /**
     * @var integer
     *
     * @ORM\Column(name="quantite", type="integer", nullable=true)
     */
    private $quantite;

    /**
     * @var integer
     *
     * @ORM\Column(name="referenceEmploye", type="integer", nullable=true)
     */
    private $referenceemploye;

    /**
     * @var integer
     * @ORM\Id
     * @ORM\Column(name="idLigneDeCommande", type="integer")
     *
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $idlignedecommande;

    /**
     * @var \AppBundle\Entity\Commande
     *
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Commande", inversedBy="commande")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idCommande", referencedColumnName="idCommande")
     * })
     */
    private $idcommande;

    /**
     * Set quantite
     *
     * @param integer $quantite
     *
     * @return LigneDeCommande
     */
    public function setQuantite($quantite)
    {
        $this->quantite = $quantite;

        return $this;
    }

    /**
     * Get quantite
     *
     * @return integer
     */
    public function getQuantite()
    {
        return $this->quantite;
    }

    /**
     * Set referenceemploye
     *
     * @param integer $referenceemploye
     *
     * @return LigneDeCommande
     */
    public function setReferenceemploye($referenceemploye)
    {
        $this->referenceemploye = $referenceemploye;

        return $this;
    }

    /**
     * Get referenceemploye
     *
     * @return integer
     */
    public function getReferenceemploye()
    {
        return $this->referenceemploye;
    }

    /**
     * Set idlignedecommande
     *
     * @param integer $idlignedecommande
     *
     * @return LigneDeCommande
     */
    public function setIdlignedecommande($idlignedecommande)
    {
        $this->idlignedecommande = $idlignedecommande;

        return $this;
    }

    /**
     * Get idlignedecommande
     *
     * @return integer
     */
    public function getIdlignedecommande()
    {
        return $this->idlignedecommande;
    }

    /**
     * Set idcommande
     *
     * @param \AppBundle\Entity\Commande $idcommande
     *
     * @return LigneDeCommande
     */
    public function setIdcommande(\AppBundle\Entity\Commande $idcommande)
    {
        $this->idcommande = $idcommande;

        return $this;
    }

    /**
     * Get idcommande
     *
     * @return \AppBundle\Entity\Commande
     */
    public function getIdcommande()
    {
        return $this->idcommande;
    }
}
