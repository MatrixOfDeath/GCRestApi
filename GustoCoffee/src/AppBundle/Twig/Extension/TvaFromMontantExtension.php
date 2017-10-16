<?php
namespace AppBundle\Twig\Extension;

class TvaFromMontantExtension extends \Twig_Extension
{
    public function getFilters()
    {
        return array(new \Twig_SimpleFilter('TvaFromMontant', array($this,'TvaFromMontant')));
    }

    function TvaFromMontant($prixTTC,$tva)
    {
        return round( ($prixTTC - ($prixTTC / (2 - $tva)) ),2);
    }

    public function getName()
    {
        return 'tva_from_montant_extension';
    }
}