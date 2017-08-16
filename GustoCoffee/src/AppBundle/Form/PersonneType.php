<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
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
            ->add('indentifiant', TextType::class, array('attr' => array('placeholder' => '  Identifiant', 'style' => 'width: 100%')))
            ->add('motdepasse', RepeatedType::class, array(
                'type' => PasswordType::class,
                'invalid_message' => 'The password fields must match.',
                'options' => array('attr' => array('class' => 'password-field', 'style' => 'width: 100%')),
                'required' => true,
                'first_options'  => array('label' => null),
                'second_options' => array('label' => null),
            ))
            ->add('nom', TextType::class, array('attr' => array('placeholder' => '  Nom', 'style' => 'width: 100%')))
            ->add('prenom', TextType::class, array('attr' => array('placeholder' => '  Prénom', 'style' => 'width: 100%')))
            ->add('email', TextType::class, array('attr' => array('placeholder' => '  Email', 'style' => 'width: 100%')))
            ->add('adresse', TextType::class, array('attr' => array('placeholder' => '  Adresse', 'style' => 'width: 100%')))
            ->add('codepostal', NumberType::class, array('attr' => array('placeholder' => '  Code Postal', 'style' => 'width: 100%')))
            ->add('ville', NumberType::class, array('attr' => array('placeholder' => '  Ville', 'style' => 'width: 100%')))
            ->add('statutpersonne')
            ->add('pointscumules')
            ->add('rulepersonne')
            ->add('newsletter')
            ->add('idrule')
            ->add('Valider', SubmitType::class, array('attr' => array('value' => 'Valider', 'style' => 'width: 100%')));
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
