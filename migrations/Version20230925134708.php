<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230925134708 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE work_request ADD client_id INT NOT NULL');
        $this->addSql('ALTER TABLE work_request ADD CONSTRAINT FK_EE5C37BD19EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('CREATE INDEX IDX_EE5C37BD19EB6921 ON work_request (client_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE work_request DROP FOREIGN KEY FK_EE5C37BD19EB6921');
        $this->addSql('DROP INDEX IDX_EE5C37BD19EB6921 ON work_request');
        $this->addSql('ALTER TABLE work_request DROP client_id');
    }
}
