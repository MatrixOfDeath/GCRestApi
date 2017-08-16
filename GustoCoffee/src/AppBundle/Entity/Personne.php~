<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Personne
 *
 * @ORM\Table(name="Personne", indexes={@ORM\Index(name="rulePersonne", columns={"rulePersonne"}), @ORM\Index(name="FK_Personne_idRule", columns={"idRule"})})
 * @ORM\Entity
 */
class Personne
{
    /**
     * @var string
     *
     * @ORM\Column(name="indentifiant", type="string", length=25, nullable=true)
     */
    private $indentifiant;

    /**
     * @var string
     *
     * @ORM\Column(name="motDePasse", type="string", length=25, nullable=true)
     */
    private $motdepasse;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=25, nullable=true)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom", type="string", length=25, nullable=true)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=25, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse", type="string", length=25, nullable=true)
     */
    private $adresse;

    /**
     * @var string
     *
     * @ORM\Column(name="codePostal", type="string", length=25, nullable=true)
     */
    private $codepostal;

    /**
     * @var string
     *
     * @ORM\Column(name="statutPersonne", type="string", length=25, nullable=false)
     */
    private $statutpersonne;

    /**
     * @var integer
     *
     * @ORM\Column(name="pointsCumules", type="integer", nullable=true)
     */
    private $pointscumules;

    /**
     * @var integer
     *
     * @ORM\Column(name="rulePersonne", type="integer", nullable=true)
     */
    private $rulepersonne;

    /**
     * @var boolean
     *
     * @ORM\Column(name="newsletter", type="boolean", nullable=true)
     */
    private $newsletter;

    /**
     * @var integer
     *
     * @ORM\Column(name="idPersonne", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idpersonne;

    /**
     * @var \AppBundle\Entity\RuleUtilisateur
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\RuleUtilisateur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idRule", referencedColumnName="idRule")
     * })
     */
    private $idrule;


}

