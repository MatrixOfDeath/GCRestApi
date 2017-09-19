<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;



/**
 * Salle
 *
 * @ORM\Table(name="Salle", uniqueConstraints={@ORM\UniqueConstraint(name="nomSalle", columns={"nomSalle"})})
 * @ORM\Entity
 */
class Salle
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomSalle", type="string", length=25, nullable=true)
     */
    private $nomsalle;

    /**
     * @var integer
     *
     * @ORM\Column(name="capacityMax", type="integer", nullable=true)
     */
    private $capacitymax;


    /**
     * @var integer
     *
     * @ORM\Column(name="idSalle", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idsalle;

    /**
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Magasin", inversedBy="idsalle")
     * @ORM\JoinColumn(name="idMagasin", referencedColumnName="idMagasin")
     */
    private $idmagasin;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Reservation", mappedBy="idsalle")
     */
    private $reservation;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->reservation = new ArrayCollection();

    }

    /**
     * @param mixed $idmagasin
     */
    public function setIdmagasin($idmagasin)
    {
        $this->idmagasin = $idmagasin;
    }

    /**
     * Get idmagasin
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdmagasin()
    {
        return $this->idmagasin;
    }



    /**
     * Set nomsalle
     *
     * @param string $nomsalle
     *
     * @return Salle
     */
    public function setNomsalle($nomsalle)
    {
        $this->nomsalle = $nomsalle;

        return $this;
    }

    /**
     * Get nomsalle
     *
     * @return string
     */
    public function getNomsalle()
    {
        return $this->nomsalle;
    }

    /**
     * Set capacitymax
     *
     * @param integer $capacitymax
     *
     * @return Salle
     */
    public function setCapacitymax($capacitymax)
    {
        $this->capacitymax = $capacitymax;

        return $this;
    }

    /**
     * Get capacitymax
     *
     * @return integer
     */
    public function getCapacitymax()
    {
        return $this->capacitymax;
    }


    /**
     * Get idsalle
     *
     * @return integer
     */
    public function getIdsalle()
    {
        return $this->idsalle;
    }

//
//    /**
//     * @param $heureDebut
//     * @param $heureFin
//     * @return mixed
//     */
//    public function checkDisponibiliteSalle($heureDebut, $heureFin)
//    {
//        $repository = $this->getDoctrine()->getRepository(Salle::class);
//
//        // createQueryBuilder() automatically selects FROM AppBundle:Reservation
//        // and aliases it to "p"
//        $query = $repository->createQueryBuilder('s')
//            ->leftJoin('s.reservation', 'r')
//            ->where('r.heureDebut > :heureDebut' )
//            ->andWhere('r.heureFin < :heureFin')
//            ->setParameter('heureDebut', $heureDebut)
//            ->setParameter('heureDebut', $heureFin)
//            ->getQuery();
//
//        return $query->getResult();
//    }



//    /**
//     * Add idmagasin
//     *
//     * @param \AppBundle\Entity\Magasin $idmagasin
//     *
//     * @return Salle
//     */
//    public function addIdmagasin(\AppBundle\Entity\Magasin $idmagasin)
//    {
//        $this->idmagasin[] = $idmagasin;
//
//        return $this;
//    }
//
//    /**
//     * Remove idmagasin
//     *
//     * @param \AppBundle\Entity\Magasin $idmagasin
//     */
//    public function removeIdmagasin(\AppBundle\Entity\Magasin $idmagasin)
//    {
//        $this->idmagasin->removeElement($idmagasin);
//    }


    /**
     * @return string
     */
    public function __toString() {
        return $this->getNomsalle();
    }
}
