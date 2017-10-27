<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170915174211 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE choisir');
        $this->addSql('ALTER TABLE Reservation ADD petitDej TINYINT(1) DEFAULT NULL, ADD dej TINYINT(1) DEFAULT NULL, ADD diner TINYINT(1) DEFAULT NULL, ADD bureautique TINYINT(1) DEFAULT NULL, CHANGE dateReservation dateReservation DATETIME DEFAULT NULL, CHANGE heureDebut heureDebut DATETIME DEFAULT NULL, CHANGE heureFin heureFin DATETIME DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE choisir (idMagasin INT NOT NULL, idSalle INT NOT NULL, INDEX IDX_C25A4AD3441634D5 (idMagasin), INDEX IDX_C25A4AD359533D41 (idSalle), PRIMARY KEY(idMagasin, idSalle)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE choisir ADD CONSTRAINT FK_C25A4AD3441634D5 FOREIGN KEY (idMagasin) REFERENCES Magasin (idMagasin)');
        $this->addSql('ALTER TABLE choisir ADD CONSTRAINT FK_C25A4AD359533D41 FOREIGN KEY (idSalle) REFERENCES Salle (idSalle)');
        $this->addSql('ALTER TABLE Reservation DROP petitDej, DROP dej, DROP diner, DROP bureautique, CHANGE dateReservation dateReservation DATE DEFAULT NULL, CHANGE heureDebut heureDebut DATE DEFAULT NULL, CHANGE heureFin heureFin DATE DEFAULT NULL');
    }
}
