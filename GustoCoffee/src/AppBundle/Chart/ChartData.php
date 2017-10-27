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
        $stats = $this->em->getRepository('AppBundle:Transaction')->amountByYear();

        $arrayToDataTable[] = ['Année', 'Montant', ['role' => 'tooltip'], 'Evolution', ['role' => 'tooltip']];
        $previousAmount = 0;
        foreach ($stats as $stat) {
            if ($previousAmount != 0) {
                $evolution = round((($stat['amount'] * 100) / $previousAmount) - 100, 2);
            } else {
                $evolution = 0;
            }
            $previousAmount = $stat['amount'];

            $tooltipAmount = $this->formatMoney($stat['amount']) . '€';
            $tooltipEvol = "$evolution %";

            $arrayToDataTable[] = [$stat['date'], floatval($stat['amount']), $tooltipAmount, $evolution, $tooltipEvol];
        }

        return $arrayToDataTable;
    }
}