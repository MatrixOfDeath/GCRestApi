<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 25/09/2017
 * Time: 14:14
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GrilleTarifaire
 *
 * @ORM\Table(name="GrilleTarifaire")
 * @ORM\Entity
 */
class GrilleTarifaire
{

    /**
     * @var integer
     *
     * @ORM\Column(name="idGrilleTarifaire", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idgrilletarifaire;


    /**
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Magasin", inversedBy="grilletarifaire")
     * @ORM\JoinColumn(name="idMagasin", referencedColumnName="idMagasin")
     */
    private $magasin;

    /**
     * @return mixed
     */
    public function getMagasin()
    {
        return $this->magasin;
    }

    /**
     * @param mixed $magasin
     */
    public function setMagasin($magasin)
    {
        $this->magasin = $magasin;
    }

//    /**
//     * @var integer
//     * @ORM\Column(name="idMagasin", type="integer")
//     */
//    private $idmagasin;

    /**
     * Heure correspondant au prix
     * @var integer
     *
     * @ORM\Column(name="duree", type="float", scale=2, length=10, nullable=true)
     */
    private $duree;


    /**
     * @var integer
     *
     * @ORM\Column(name="nom", type="string", length=50, nullable=true)
     */
    private $nom;


    /**
     * @var float
     *
     * @ORM\Column(name="prix", type="float", scale=2, length=10, nullable=true)
     */
    private $prix;

    /**
     * @return float
     */
    public function getDuree()
    {
        return $this->duree;
    }

    /**
     * @param float $duree
     */
    public function setDuree($duree)
    {
        $this->duree = $duree;
    }

    /**
     * @return mixed
     */
    public function getIdmagasin()
    {
        return $this->idmagasin;
    }

    /**
     * @param mixed $idmagasin
     */
    public function setIdmagasin($idmagasin)
    {
        $this->idmagasin = $idmagasin;
    }

    /**
     * @return int
     */
    public function getIdgrilletarifaire()
    {
        return $this->idgrilletarifaire;
    }

    /**
     * @param int $idgrilletarifaire
     */
    public function setIdgrilletarifaire($idgrilletarifaire)
    {
        $this->idgrilletarifaire = $idgrilletarifaire;
    }

    /**
     * @return int
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * @param int $nom
     */
    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    /**
     * @return float
     */
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * @param float $prix
     */
    public function setPrix($prix)
    {
        $this->prix = $prix;
    }

    /**
     * @return string
     */
    public function __toString() {
        return $this->getNom(). ': Durée ' . $this->getDuree() . 'H, Prix: ' . $this->getPrix().'€';
    }


}