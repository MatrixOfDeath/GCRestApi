<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;


class PersonneType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('indentifiant', TextType::class, array('attr' => array('placeholder' => '  Identifiant')))
            ->add('motdepasse', PasswordType::class, array('attr' => array('placeholder' => '  Mot de passe')))
            ->add('nom')
            ->add('prenom')
            ->add('email')
            ->add('adresse')
            ->add('codepostal')
            ->add('statutpersonne')
            ->add('pointscumules')
            ->add('rulepersonne')
            ->add('newsletter')
            ->add('idrule')
            ->add('Valider', SubmitType::class, array('attr' => array('value' => 'Valider')));
        ;
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Personne'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_personne';
    }


}
