<?php

namespace AppBundle\Form\Type;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class ProfileFormType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom', TextType::class, array('attr' => array('placeholder' => '  Nom', 'style' => 'width: 100%')))
            ->add('prenom', TextType::class, array('attr' => array('placeholder' => '  Prénom', 'style' => 'width: 100%')))
            ->add('email', TextType::class, array('attr' => array('placeholder' => '  Email', 'style' => 'width: 100%')))
            ->add('adresse', TextType::class, array('attr' => array('placeholder' => '  Adresse', 'style' => 'width: 100%')))
            ->add('codepostal', NumberType::class, array('attr' => array('placeholder' => '  Code Postal', 'style' => 'width: 100%')))
            ->add('ville', TextType::class, array('attr' => array('placeholder' => '  Ville', 'style' => 'width: 100%')))
            ->add('newsletter')
        ;
    }

    public function getParent()

    {
        return 'FOS\UserBundle\Form\Type\ProfileFormType';
    }

    public function getBlockPrefix()
    {
        return 'fos_user_profile_edit';
    }
}