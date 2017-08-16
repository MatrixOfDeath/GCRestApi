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

}

