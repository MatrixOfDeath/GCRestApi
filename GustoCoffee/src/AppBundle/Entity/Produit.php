<?php

namespace AppBundle\Entity;

use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\ORM\Mapping as ORM;

/**
 * Produit
 *
 * @ORM\Table(name="Produit", indexes={@ORM\Index(name="quantiteEnStock", columns={"quantiteEnStock"}),
 *     @ORM\Index(name="FK_Produit_idTypeProduit", columns={"idTypeProduit"}),
 *     @ORM\Index(name="FK_Produit_idStatutProduit", columns={"idStatutProduit"}),
 *     @ORM\Index(name="FK_Ligne_Facture_idTva", columns={"idTva"}),
 * })
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ProduitsRepository")
 * @Vich\Uploadable()
 * @ORM\HasLifecycleCallbacks()
 */
class Produit
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idProduit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idproduit;

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


    /**
     * @ORM\Column(type="string", length=255)
     * @var string
     */
    private $image;

    /**
     * @Vich\UploadableField(mapping="products_images", fileNameProperty="image")
     * @var File
     */
    private $imageFile;


    /**
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tva", inversedBy="idtva")
     * @ORM\JoinColumn(name="idTva", referencedColumnName="idTva")
     */
    private $tva;

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
     * Set nomproduit
     *
     * @param string $nomproduit
     *
     * @return Produit
     */
    public function setNomproduit($nomproduit)
    {
        $this->nomproduit = $nomproduit;

        return $this;
    }

    /**
     * Get nomproduit
     *
     * @return string
     */
    public function getNomproduit()
    {
        return $this->nomproduit;
    }

    /**
     * Set prixproduit
     *
     * @param float $prixproduit
     *
     * @return Produit
     */
    public function setPrixproduit($prixproduit)
    {
        $this->prixproduit = $prixproduit;

        return $this;
    }

    /**
     * Get prixproduit
     *
     * @return float
     */
    public function getPrixproduit()
    {
        return $this->prixproduit;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Produit
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set quantiteenstock
     *
     * @param integer $quantiteenstock
     *
     * @return Produit
     */
    public function setQuantiteenstock($quantiteenstock)
    {
        $this->quantiteenstock = $quantiteenstock;

        return $this;
    }

    /**
     * Get quantiteenstock
     *
     * @return integer
     */
    public function getQuantiteenstock()
    {
        return $this->quantiteenstock;
    }

    /**
     * Set statutproduit
     *
     * @param integer $statutproduit
     *
     * @return Produit
     */
    public function setStatutproduit($statutproduit)
    {
        $this->statutproduit = $statutproduit;

        return $this;
    }

    /**
     * Get statutproduit
     *
     * @return integer
     */
    public function getStatutproduit()
    {
        return $this->statutproduit;
    }

    /**
     * Get idproduit
     *
     * @return integer
     */
    public function getIdproduit()
    {
        return $this->idproduit;
    }

    /**
     * Set idstatutproduit
     *
     * @param \AppBundle\Entity\StatutProduit $idstatutproduit
     *
     * @return Produit
     */
    public function setIdstatutproduit(\AppBundle\Entity\StatutProduit $idstatutproduit = null)
    {
        $this->idstatutproduit = $idstatutproduit;

        return $this;
    }

    /**
     * Get idstatutproduit
     *
     * @return \AppBundle\Entity\StatutProduit
     */
    public function getIdstatutproduit()
    {
        return $this->idstatutproduit;
    }

    /**
     * Set idtypeproduit
     *
     * @param \AppBundle\Entity\TypeDeProduit $idtypeproduit
     *
     * @return Produit
     */
    public function setIdtypeproduit(\AppBundle\Entity\TypeDeProduit $idtypeproduit = null)
    {
        $this->idtypeproduit = $idtypeproduit;

        return $this;
    }

    /**
     * Get idtypeproduit
     *
     * @return \AppBundle\Entity\TypeDeProduit
     */
    public function getIdtypeproduit()
    {
        return $this->idtypeproduit;
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
     * Set tva
     *
     * @param \AppBundle\Entity\Tva $tva
     * @return Produit
     */
    public function setTva(\AppBundle\Entity\Tva $tva)
    {
        $this->tva = $tva;

        return $this;
    }

    /**
     * Get tva
     *
     * @return \AppBundle\Entity\Tva
     */
    public function getTva()
    {
        return $this->tva;
    }
}
