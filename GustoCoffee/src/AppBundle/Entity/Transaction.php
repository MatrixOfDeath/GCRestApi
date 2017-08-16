<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Transaction
 *
 * @ORM\Table(name="Transaction")
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
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Facture", inversedBy="idtransaction")
     * @ORM\JoinTable(name="concerne",
     *   joinColumns={
     *     @ORM\JoinColumn(name="idTransaction", referencedColumnName="idTransaction")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="idFacture", referencedColumnName="idFacture")
     *   }
     * )
     */
    private $idfacture;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idfacture = new \Doctrine\Common\Collections\ArrayCollection();
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
}
