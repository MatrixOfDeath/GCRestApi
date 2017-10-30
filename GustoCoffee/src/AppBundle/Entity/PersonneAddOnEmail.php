<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 14/09/2017
 * Time: 02:46
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Table("fos_user_add_on_email")
 * @ORM\Entity
 */
class PersonneAddOnEmail
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;
    /**
     * @ORM\ManyToOne(targetEntity="Personne", inversedBy="addOnEmails")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;
    /**
     * @ORM\Column(type="string", length=155, unique=true, nullable=false)
     */
    private $email;

    public function __construct()
    {
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new \DateTime(date('Y-m-d H:i:s')));
        }
    }
    /**
     * Set email
     *
     * @param string $email
     *
     * @return PersonneAddOnEmail
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
     * Set personne
     *
     * @param \AppBundle\Entity\Personne $user
     *
     * @return PersonneAddOnEmail
     */
    public function setPersonne(\AppBundle\Entity\Personne $user = null)
    {
        $this->user = $user;
        return $this;
    }
    /**
     * Get personne
     *
     * @return \AppBundle\Entity\Personne
     */
    public function getPersonne()
    {
        return $this->user;
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return PersonneAddOnEmail
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
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
}