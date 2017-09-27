<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170923200447 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE Ligne_de_Commande DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE Ligne_de_Commande CHANGE idLigneDeCommande idLigneDeCommande INT AUTO_INCREMENT NOT NULL, CHANGE idCommande idCommande INT DEFAULT NULL, CHANGE idReservation idReservation INT DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AE57FC4A3D498C26 ON Ligne_de_Commande (idCommande)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AE57FC4A295B62D ON Ligne_de_Commande (idReservation)');
        $this->addSql('ALTER TABLE Ligne_de_Commande ADD PRIMARY KEY (idLigneDeCommande)');
        $this->addSql('ALTER TABLE Produit ADD CONSTRAINT FK_E618D5BBCE218BA7 FOREIGN KEY (idTva) REFERENCES Tva (idTva)');
        $this->addSql('CREATE INDEX IDX_E618D5BBCE218BA7 ON Produit (idTva)');
        $this->addSql('ALTER TABLE Reservation DROP petitDej, DROP dej, DROP diner, DROP bureautique');
        $this->addSql('ALTER TABLE TVA ADD nom VARCHAR(125) NOT NULL, ADD valeur DOUBLE PRECISION NOT NULL, ADD multiplicate DOUBLE PRECISION NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE Ligne_de_Commande MODIFY idLigneDeCommande INT NOT NULL');
        $this->addSql('DROP INDEX UNIQ_AE57FC4A3D498C26 ON Ligne_de_Commande');
        $this->addSql('DROP INDEX UNIQ_AE57FC4A295B62D ON Ligne_de_Commande');
        $this->addSql('ALTER TABLE Ligne_de_Commande DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE Ligne_de_Commande CHANGE idLigneDeCommande idLigneDeCommande INT NOT NULL, CHANGE idCommande idCommande INT NOT NULL, CHANGE idReservation idReservation INT NOT NULL');
        $this->addSql('ALTER TABLE Ligne_de_Commande ADD PRIMARY KEY (idLigneDeCommande, idCommande, idReservation)');
        $this->addSql('ALTER TABLE Produit DROP FOREIGN KEY FK_E618D5BBCE218BA7');
        $this->addSql('DROP INDEX IDX_E618D5BBCE218BA7 ON Produit');
        $this->addSql('ALTER TABLE Reservation ADD petitDej TINYINT(1) DEFAULT NULL, ADD dej TINYINT(1) DEFAULT NULL, ADD diner TINYINT(1) DEFAULT NULL, ADD bureautique TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE Tva DROP nom, DROP valeur, DROP multiplicate');
    }
}
