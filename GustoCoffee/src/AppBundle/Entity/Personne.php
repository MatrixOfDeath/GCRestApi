<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * Personne
 *
 * @ORM\Table(name="Personne", indexes={@ORM\Index(name="rulePersonne", columns={"rulePersonne"}),
 * @ORM\Index(name="FK_Personne_idRule", columns={"idRule"})})
 * @ORM\Entity
 */
class Personne extends BaseUser
{

    const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_USER = 'ROLE_USER';

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Commande", mappedBy="personnes", cascade={"remove"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $commandes;

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
    //protected $email;


    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\UtilisateursAdresses", mappedBy="utilisateur", cascade={"remove"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $adresses;

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
     * @ORM\Column(name="ville", type="string", length=25, nullable=true)
     */
    private $ville;

    /**
     * @var integer
     *
     * @ORM\Column(name="telephone", type="integer", length=10, nullable=true)
     */

    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(name="statutPersonne", type="string", length=25, nullable=true)
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
     * @var \AppBundle\Entity\RuleUtilisateur
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\RuleUtilisateur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idRule", referencedColumnName="idRule")
     * })
     */
    private $idrule;

    // Adding emails
    /**
     * @ORM\OneToMany(targetEntity="PersonneAddOnEmail", mappedBy="user", cascade={"persist"})
     */
    private $addOnEmails;

    /**
     * Personne constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->addOnEmails = new ArrayCollection();
        $this->commandes = new ArrayCollection();
        $this->adresses = new \Doctrine\Common\Collections\ArrayCollection();
        $this->newsletter = false;

    }
    /**
     * @param string $email
     *
     * @return $this
     */
    public function addEmail($email)
    {
        $addOnEmail = new PersonneAddOnEmail();
        $addOnEmail->setEmail($email);
        $addOnEmail->setPersonne($this);
        $this->addOnEmails[] = $addOnEmail;
        return $this;
    }
    /**
     * @return ArrayCollection
     */
    public function getAddOnEmails()
    {
        return $this->addOnEmails;
    }

    /**
     * Set indentifiant
     *
     * @param string $indentifiant
     *
     * @return Personne
     */
    public function setIndentifiant($indentifiant)
    {
        $this->indentifiant = $indentifiant;

        return $this;
    }

    /**
     * Get indentifiant
     *
     * @return string
     */
    public function getIndentifiant()
    {
        return $this->indentifiant;
    }

    /**
     * Set motdepasse
     *
     * @param string $motdepasse
     *
     * @return Personne
     */
    public function setMotdepasse($motdepasse)
    {
        $this->motdepasse = $motdepasse;

        return $this;
    }

    /**
     * Get motdepasse
     *
     * @return string
     */
    public function getMotdepasse()
    {
        return $this->motdepasse;
    }

    /**
     * Set nom
     *
     * @param string $nom
     *
     * @return Personne
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Set prenom
     *
     * @param string $prenom
     *
     * @return Personne
     */
    public function setPrenom($prenom)
    {
        $this->prenom = $prenom;

        return $this;
    }

    /**
     * Get prenom
     *
     * @return string
     */
    public function getPrenom()
    {
        return $this->prenom;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Personne
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set adresse
     *
     * @param string $adresse
     *
     * @return Personne
     */
    public function setAdresse($adresse)
    {
        $this->adresse = $adresse;

        return $this;
    }

    /**
     * Get adresse
     *
     * @return string
     */
    public function getAdresse()
    {
        return $this->adresse;
    }

    /**
     * Set codepostal
     *
     * @param string $codepostal
     *
     * @return Personne
     */
    public function setCodepostal($codepostal)
    {
        $this->codepostal = $codepostal;

        return $this;
    }

    /**
     * Get codepostal
     *
     * @return string
     */
    public function getCodepostal()
    {
        return $this->codepostal;
    }

    /**
     * Set ville
     *
     * @param string $ville
     *
     * @return Personne
     */
    public function setVille($ville)
    {
        $this->ville = $ville;

        return $this;
    }

    /**
     * Get ville
     *
     * @return string
     */
    public function getVille()
    {
        return $this->ville;
    }

    /**
     * Set statutpersonne
     *
     * @param string $statutpersonne
     *
     * @return Personne
     */
    public function setStatutpersonne($statutpersonne)
    {
        $this->statutpersonne = $statutpersonne;

        return $this;
    }

    /**
     * Get statutpersonne
     *
     * @return string
     */
    public function getStatutpersonne()
    {
        return $this->statutpersonne;
    }

    /**
     * Set pointscumules
     *
     * @param integer $pointscumules
     *
     * @return Personne
     */
    public function setPointscumules($pointscumules)
    {
        $this->pointscumules = $pointscumules;

        return $this;
    }

    /**
     * Get pointscumules
     *
     * @return integer
     */
    public function getPointscumules()
    {
        return $this->pointscumules;
    }

    /**
     * Set rulepersonne
     *
     * @param integer $rulepersonne
     *
     * @return Personne
     */
    public function setRulepersonne($rulepersonne)
    {
        $this->rulepersonne = $rulepersonne;

        return $this;
    }

    /**
     * Get rulepersonne
     *
     * @return integer
     */
    public function getRulepersonne()
    {
        return $this->rulepersonne;
    }

    /**
     * Set newsletter
     *
     * @param boolean $newsletter
     *
     * @return Personne
     */
    public function setNewsletter($newsletter)
    {
        $this->newsletter = $newsletter;

        return $this;
    }

    /**
     * Get newsletter
     *
     * @return boolean
     */
    public function getNewsletter()
    {
        return $this->newsletter;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idrule
     *
     * @param \AppBundle\Entity\RuleUtilisateur $idrule
     *
     * @return Personne
     */
    public function setIdrule(\AppBundle\Entity\RuleUtilisateur $idrule = null)
    {
        $this->idrule = $idrule;

        return $this;
    }

    /**
     * Get idrule
     *
     * @return \AppBundle\Entity\RuleUtilisateur
     */
    public function getIdrule()
    {
        return $this->idrule;
    }


    /**
     * @return string
     */
    public function __toString() {
        return $this->getUsername();
    }

    /**
     * @return int
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * @param int $telephone
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    }

    /**
     * Add commandes
     *
     * @param \AppBundle\Entity\Commande $commandes
     * @return Personne
     */
    public function addCommande(\AppBundle\Entity\Commande $commandes)
    {
        $this->commandes[] = $commandes;

        return $this;
    }

    /**
     * Remove commandes
     *
     * @param \AppBundle\Entity\Commande $commandes
     */
    public function removeCommande(\AppBundle\Entity\Commande $commandes)
    {
        $this->commandes->removeElement($commandes);
    }

    /**
     * Get commandes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCommandes()
    {
        return $this->commandes;
    }

    /**
     * Add adresses
     *
     * @param \AppBundle\Entity\UtilisateursAdresses $adresses
     * @return Personne
     */
    public function addAdress(\AppBundle\Entity\UtilisateursAdresses $adresses)
    {
        $this->adresses[] = $adresses;

        return $this;
    }

    /**
     * Remove adresses
     *
     * @param \AppBundle\Entity\UtilisateursAdresses $adresses
     */
    public function removeAdress(\AppBundle\Entity\UtilisateursAdresses $adresses)
    {
        $this->adresses->removeElement($adresses);
    }

    /**
     * Get adresses
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAdresses()
    {
        return $this->adresses;
    }

}
