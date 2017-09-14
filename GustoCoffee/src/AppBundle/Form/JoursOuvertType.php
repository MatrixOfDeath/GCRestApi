<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class JoursOuvertType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('jours')
            ->add('heuredebut', ChoiceType::class, array(
                'choices' => array(
                    'Heure de début' => array(
                        '8:00' => '8.00',
                        '8:30' => '8:30',
                        '9:00' => '9:00',
                        '9:30' => '9:30',
                        '10:00' => '10:00',
                        '10:30' => '10:30',
                        '11:00' => '11:00',
                        '11:30' => '11:30',
                        '12:00' => '12:00',
                        '12:30' => '12:300',
                        '13:00' => '13:00',
                        '13:30' => '13:30',
                        '14:00' => '14:00',
                        '14:30' => '14:30',
                        '15:00' => '15:00',
                        '15:30' => '15:30',
                        '16:00' => '16:00',
                        '16:30' => '16:30',
                        '17:00' => '17:00',
                        '17:30' => '17:30',
                        '18:00' => '18:00',
                        '18:30' => '18:30',
                        '19:00' => '19:00',
                        '19:30' => '19:30',
                        '20:00' => '20:00',
                    ))))
            ->add('heurefin');
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\JoursOuvert'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_joursouvert';
    }

}