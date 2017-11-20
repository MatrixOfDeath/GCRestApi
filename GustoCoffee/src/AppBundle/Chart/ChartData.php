<?php
/**
 * Created by PhpStorm.
 * User: Karim BOUBRIT
 * Date: 24/10/2017
 * Time: 11:21
 */
namespace AppBundle\Chart;

use Doctrine\Common\Persistence\ObjectManager;

class ChartData
{
    private $em;

    public function __construct(ObjectManager $em)
    {
        $this->em = $em;
    }


    /**
     * Formate un montant dans le format français.
     *
     * @param float $amount Montant à formater
     *
     * @return string Le montant formaté
     */
    private function formatMoney($amount)
    {
        return number_format($amount, 2, ',', ' ');
    }

    /**
     * Récupère et organise les données pour le graphique des bénéfices par année.
     *
     * @return array
     */
    public function dataAmountByYear()
    {
        $stats = $this->em->getRepository('AppBundle:Commande')->amountByYear();

        $arrayToDataTable[] = ['Année', 'Montant', ['role' => 'tooltip'], 'Evolution', ['role' => 'tooltip']];
        $previousAmount = 0;
       // var_dump($stats);
        foreach ($stats as $stat) {
//            var_dump($stat);die();
            if ($previousAmount != 0) {
                $evolution = round((($stat['commande']['prixTTC'] * 100) / $previousAmount) - 100, 2);
            } else {
                $evolution = 0;
            }
            $previousAmount = $stat['commande']['prixTTC'];

            $tooltipAmount = $this->formatMoney($stat['commande']['prixTTC']) . '€';
            $tooltipEvol = "$evolution %";

            $arrayToDataTable[] = [$stat['datecommande'], floatval($stat['commande']['prixTTC']), $tooltipAmount, $evolution, $tooltipEvol];
        }

        return $arrayToDataTable;
    }
}