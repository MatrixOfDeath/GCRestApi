<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;



/**
 * Salle
 *
 * @ORM\Table(name="Salle", uniqueConstraints={@ORM\UniqueConstraint(name="nomSalle", columns={"nomSalle"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SallesRepository")
 * @Vich\Uploadable()
 * @ORM\HasLifecycleCallbacks()
 */
class Salle
{

    /**
     * @var integer
     *
     * @ORM\Column(name="idSalle", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idsalle;

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
     * @ORM\Column(type="string", length=255)
     * @var string
     */
    private $image;

    /**
     * @Vich\UploadableField(mapping="salles_images", fileNameProperty="image")
     * @var File
     */
    private $imageFile;

    /**
     * @var float
     *
     * @ORM\Column(name="prixProduit", type="float", precision=10, scale=0, nullable=true)
     */
    private $prixsalle;

    /**
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tva", inversedBy="salles")
     * @ORM\JoinColumn(name="idTva", referencedColumnName="idTva")
     */
    private $idtva;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     * @var \DateTime
     */
    private $updatedAt;

    /**
     * created Time/Date
     *
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    protected $createdAt;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->reservation = new ArrayCollection();
    }

    /**
     * Set createdAt
     *
     * @ORM\PrePersist
     */
    public function setCreatedAt()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @ORM\PreUpdate
     */
    public function setUpdatedAt()
    {
        $this->updatedAt = new \DateTime();
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
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

    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($image) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTime('now');
        }
    }

    public function getImageFile()
    {
        return $this->imageFile;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function getImage()
    {
        return $this->image;
    }


    /**
     * Set prixsalle
     *
     * @param float $prixsalle
     *
     * @return Salle
     */
    public function setPrixsalle($prixsalle)
    {
        $this->prixsalle = $prixsalle;

        return $this;
    }

    /**
     * Get prixsalle
     *
     * @return float
     */
    public function getPrixsalle()
    {
        return $this->prixsalle;
    }

    /**
     * Set tva
     *
     * @param \AppBundle\Entity\Tva $idtva
     * @return Salle
     */
    public function setTva(\AppBundle\Entity\Tva $idtva)
    {
        $this->idtva = $idtva;

        return $this;
    }

    /**
     * Get tva
     *
     * @return \AppBundle\Entity\Tva
     */
    public function getTva()
    {
        return $this->idtva;
    }

    /**
     * @return string
     */
    public function __toString() {
        return $this->getNomsalle();
    }
}
