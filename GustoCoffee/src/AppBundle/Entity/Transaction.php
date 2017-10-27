<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Transaction
 *
 * @ORM\Table(name="Transaction")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity
 */
class Transaction
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateTrans", type="date", nullable=true)
     */
    private $datetrans;

    /**
     * @var float
     * @ORM\Column(name="montantTotal", type="integer", nullable=true)
     */
    private $montanttotal;


    /**
     * @var integer
     *
     * @ORM\Column(name="statutTransaction", type="integer", nullable=true)
     */
    private $statuttransaction;

    /**
     * @var string
     *
     * @ORM\Column(name="commentaireTransaction", type="text", length=255, nullable=true)
     */
    private $commentairetransaction;

    /**
     * @var integer
     *
     * @ORM\Column(name="idTransaction", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idtransaction;

    /**
     * One Transaction has One commande.
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Commande", inversedBy="transaction")
     * @ORM\JoinColumn(name="idcommande", referencedColumnName="idCommande")
     */
    private $commande;

    /**
     * @return mixed
     */
    public function getCommande()
    {
        return $this->commande;
    }

    /**
     * @param mixed $commande
     */
    public function setCommande($commande)
    {
        $this->commande = $commande;
    }


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
     * Constructor
     */
    public function __construct()
    {
        $this->idfacture = new \Doctrine\Common\Collections\ArrayCollection();
        $this->commande = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set datetrans
     *
     * @param \DateTime $datetrans
     *
     * @return Transaction
     */
    public function setDatetrans($datetrans)
    {
        $this->datetrans = $datetrans;

        return $this;
    }

    /**
     * Get datetrans
     *
     * @return \DateTime
     */
    public function getDatetrans()
    {
        return $this->datetrans;
    }

    /**
     * Set statuttransaction
     *
     * @param integer $statuttransaction
     *
     * @return Transaction
     */
    public function setStatuttransaction($statuttransaction)
    {
        $this->statuttransaction = $statuttransaction;

        return $this;
    }

    /**
     * Get statuttransaction
     *
     * @return integer
     */
    public function getStatuttransaction()
    {
        return $this->statuttransaction;
    }

    /**
     * Set commentairetransaction
     *
     * @param string $commentairetransaction
     *
     * @return Transaction
     */
    public function setCommentairetransaction($commentairetransaction)
    {
        $this->commentairetransaction = $commentairetransaction;

        return $this;
    }

    /**
     * Get commentairetransaction
     *
     * @return string
     */
    public function getCommentairetransaction()
    {
        return $this->commentairetransaction;
    }

    /**
     * Get idtransaction
     *
     * @return integer
     */
    public function getIdtransaction()
    {
        return $this->idtransaction;
    }

    /**
     * Add idfacture
     *
     * @param \AppBundle\Entity\Facture $idfacture
     *
     * @return Transaction
     */
    public function addIdfacture(\AppBundle\Entity\Facture $idfacture)
    {
        $this->idfacture[] = $idfacture;

        return $this;
    }

    /**
     * Remove idfacture
     *
     * @param \AppBundle\Entity\Facture $idfacture
     */
    public function removeIdfacture(\AppBundle\Entity\Facture $idfacture)
    {
        $this->idfacture->removeElement($idfacture);
    }

    /**
     * Get idfacture
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdfacture()
    {
        return $this->idfacture;
    }

    /**
     * @return float
     */
    public function getMontanttotal()
    {
        return $this->montanttotal;
    }

    /**
     * @param float $montanttotal
     */
    public function setMontanttotal($montanttotal)
    {
        $this->montanttotal = $montanttotal;
    }
}
