<?php
namespace AppBundle\Services;


use Spipu\Html2Pdf\Html2Pdf;
use Symfony\Component\DependencyInjection\ContainerInterface;

class GetFacture 
{

    /**
     * GetFacture constructor.
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @param $facture
     * @return Html2Pdf
     */
    public function facture($facture)
    {
        $html = $this->container->get('templating')->render('facture/facturePDF.html.twig', array('facture' => $facture));
        
        $html2pdf = new Html2Pdf('P','A4','fr');
        $html2pdf->pdf->SetAuthor('GustoCoffee');
        $html2pdf->pdf->SetTitle('Facture '.$facture->getReference());
        $html2pdf->pdf->SetSubject('Facture GustoCoffee');
        $html2pdf->pdf->SetKeywords('facture,gustocoffee');
        $html2pdf->pdf->SetDisplayMode('real');
        $html2pdf->writeHTML($html);
        
        return $html2pdf;
    }
}