<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Place
 *
 * @ORM\Table(name="Place", indexes={@ORM\Index(name="nomPlace", columns={"nomPlace", "statutPlace"}), @ORM\Index(name="FK_Place_idSalle", columns={"idSalle"})})
 * @ORM\Entity
 */
class Place
{
    /**
     * @var string
     *
     * @ORM\Column(name="nomPlace", type="string", length=25, nullable=true)
     */
    private $nomplace;

    /**
     * @var string
     *
     * @ORM\Column(name="statutPlace", type="string", length=25, nullable=true)
     */
    private $statutplace;

    /**
     * @var integer
     *
     * @ORM\Column(name="idPlace", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idplace;

    /**
     * @var \AppBundle\Entity\Salle
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Salle")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idSalle", referencedColumnName="idSalle")
     * })
     */
    private $idsalle;


}

