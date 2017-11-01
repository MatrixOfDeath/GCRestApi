<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, array('attr' => array('placeholder' => 'Votre Nom et Prénom *'),
                'constraints' => array(
                    new NotBlank(array("message" => "Veuillez entrer votre nom et prénom")),
                )
            ))
            ->add('subject', TextType::class, array('attr' => array('placeholder' => 'Sujet du mail *'),
                'constraints' => array(
                    new NotBlank(array("message" => "Veuillez entrer le sujet du mail")),
                )
            ))
            ->add('email', EmailType::class, array('attr' => array('placeholder' => 'Votre Email *'),
                'constraints' => array(
                    new NotBlank(array("message" => "Veuillez entrer un maim valide")),
                    new Email(array("message" => "Votre mail ne semble pas être valide")),
                )
            ))
            ->add('message', TextareaType::class, array('attr' => array('placeholder' => 'Votre Message *'),
                'constraints' => array(
                    new NotBlank(array("message" => "Veuillez entrer un message")),
                )
            ))
        ;
    }

    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'error_bubbling' => true
        ));
    }

    public function getName()
    {
        return 'contact_form';
    }
}
