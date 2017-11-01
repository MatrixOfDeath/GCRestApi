<?php
namespace AppBundle\Twig\Extension;

class TvaExtension extends \Twig_Extension
{
    public function getFilters()
    {
        return array(new \Twig_SimpleFilter('tva', array($this,'calculTva')));
    }
    
    public function calculTva($prixHT,$tva)
    {
        return round($prixHT / $tva,2);
    }
    
    public function getName()
    {
        return 'tva_extension';
    }
}