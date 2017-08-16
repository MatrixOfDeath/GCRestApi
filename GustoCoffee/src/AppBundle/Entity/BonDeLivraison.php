<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BonDeLivraison
 *
 * @ORM\Table(name="Bon_De_Livraison", indexes={@ORM\Index(name="FK_Bon_De_Livraison_idDemandeProduit", columns={"idDemandeProduit"})})
 * @ORM\Entity
 */
class BonDeLivraison
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateBonDeLivraison", type="date", nullable=true)
     */
    private $datebondelivraison;

    /**
     * @var string
     *
     * @ORM\Column(name="nomFichierBon", type="string", length=25, nullable=true)
     */
    private $nomfichierbon;

    /**
     * @var integer
     *
     * @ORM\Column(name="idBonDeLivraison", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idbondelivraison;

    /**
     * @var \AppBundle\Entity\DemandeProduit
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\DemandeProduit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idDemandeProduit", referencedColumnName="idDemandeProduit")
     * })
     */
    private $iddemandeproduit;



    /**
     * Set datebondelivraison
     *
     * @param \DateTime $datebondelivraison
     *
     * @return BonDeLivraison
     */
    public function setDatebondelivraison($datebondelivraison)
    {
        $this->datebondelivraison = $datebondelivraison;

        return $this;
    }

    /**
     * Get datebondelivraison
     *
     * @return \DateTime
     */
    public function getDatebondelivraison()
    {
        return $this->datebondelivraison;
    }

    /**
     * Set nomfichierbon
     *
     * @param string $nomfichierbon
     *
     * @return BonDeLivraison
     */
    public function setNomfichierbon($nomfichierbon)
    {
        $this->nomfichierbon = $nomfichierbon;

        return $this;
    }

    /**
     * Get nomfichierbon
     *
     * @return string
     */
    public function getNomfichierbon()
    {
        return $this->nomfichierbon;
    }

    /**
     * Get idbondelivraison
     *
     * @return integer
     */
    public function getIdbondelivraison()
    {
        return $this->idbondelivraison;
    }

    /**
     * Set iddemandeproduit
     *
     * @param \AppBundle\Entity\DemandeProduit $iddemandeproduit
     *
     * @return BonDeLivraison
     */
    public function setIddemandeproduit(\AppBundle\Entity\DemandeProduit $iddemandeproduit = null)
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
}
