<?php
namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class FacturesCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this->setName('gustocoffee:facture')
             ->setDescription('Ceci est un premier test')
             ->addArgument('datecommande', InputArgument::OPTIONAL, 'Date pour laquel vous souhaitez récuperer les factures');
    }
    
    protected function execute(InputInterface $input, OutputInterface $output) 
    {
        $date = new \DateTime();
        $em = $this->getContainer()->get('doctrine')->getManager();
        $factures = $em->getRepository('AppBundle:Commande')->byDateCommand($input->getArgument('datecommande'));
        
        $output->writeln(count($factures).' facture(s).');
        
        if (count($factures) > 0) {
            $dir = $date->format('d-m-Y h-i-s');
            mkdir('Facturation/'.$dir);
            
            foreach($factures as $facture) {
                $this->getContainer()->get('set_new_facture')->facture($facture)
                        ->Output('facturation/'.$dir.'/facture'.$facture->getReference().'.pdf','F');
            }
        }
    }
}