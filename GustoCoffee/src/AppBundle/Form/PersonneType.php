<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
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
            ->add('nom', TextType::class, array('attr' => array('placeholder' => '  Nom')))
            ->add('prenom', TextType::class, array('attr' => array('placeholder' => '  Prénom')))
            ->add('email', TextType::class, array('attr' => array('placeholder' => '  Email')))
            ->add('adresse', TextType::class, array('attr' => array('placeholder' => '  Adresse')))
            ->add('codepostal', NumberType::class, array('attr' => array('placeholder' => '  Code Postal')))
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
