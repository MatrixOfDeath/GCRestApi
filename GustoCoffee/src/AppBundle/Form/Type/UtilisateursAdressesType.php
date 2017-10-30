<?php

namespace AppBundle\Form\Type;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class UtilisateursAdressesType extends AbstractType
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * UtilisateursAdressesType constructor.
     *
     */
    public function __construct($em)
    {
        $this->em = $em;
        //$this->em = $em;
    }
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom')
            ->add('prenom')
            ->add('telephone')
            ->add('adresse')
            ->add('cp',null, array('attr' => array('class' => 'cp',
                                                   'maxlength' => 5)))
            ->add('ville',ChoiceType::class, array('attr' => array('class' => 'ville')))
            ->add('pays')
            ->add('vatNumber')
            ->add('complement',null,array('required' => false))
            //->add('utilisateur')
        ;

        $city = function(FormInterface $form, $cp) {
            $villeCodePostal = $this->em->getRepository('AppBundle:Villes')->findCp($cp);

            if ($villeCodePostal) {
                $villes = array();

                foreach($villeCodePostal as $ville) {
                    $villes[$ville->getVilleNom()] = $ville->getVilleNom();
                }
            } else {
                $villes = null;
            }

            $form->add('ville',ChoiceType::class, array('attr' => array('class'  => 'ville'),
                                               'choices' => $villes));
        }; 
        
        $builder->get('cp')->addEventListener(FormEvents::POST_SUBMIT, function(FormEvent $event) use ($city) {
            $city($event->getForm()->getParent(),$event->getForm()->getData());
        });
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\UtilisateursAdresses'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_utilisateursadresses';
    }
}
