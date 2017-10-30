<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('datereservation', DateType::Class,
                array( 'widget' => 'choice',
                    'years' => range(date('Y'), date('Y')+2),
                    'months' => range(date('m'), 12),
                    'days' => range(date('d'), 31),))
            ->add('heuredebut', DateTimeType::class, [
                "hours" => ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
                "minutes" => ["00", "30"],
            ])
            ->add('heurefin', DateTimeType::class, [
                "hours" => ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
                "minutes" => ["00", "30"],
            ])
            ->add('remarquereservation')
            ->add('commentaireclient')
            ->add('idfermeture')
            ->add('idmagasin')
            ->add('idmodepaiement')
            ->add('idouverture')
            ->add('idpersonne')
            ->add('petitDej')
            ->add('dej')
            ->add('diner')
            ->add('bureautique');

    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Reservation'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_reservation';
    }


}
