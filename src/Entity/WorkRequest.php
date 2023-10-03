<?php

namespace App\Entity;

use App\Repository\WorkRequestRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: WorkRequestRepository::class)]
#[Vich\Uploadable]
class WorkRequest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $workType = null;

    #[ORM\Column(length: 255)]
    private ?string $heatingSystem = null;

    #[ORM\Column(length: 255)]
    private ?string $existingInstallation = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(nullable: true)]
    private ?string $fileName = null;

    #[ORM\Column(nullable: true)]
    private ?int $fileSize = null;

    #[Vich\UploadableField(mapping: 'works_plans', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'workRequests')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Client $client = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWorkType(): ?string
    {
        return $this->workType;
    }

    public function setWorkType(string $workType): self
    {
        $this->workType = $workType;

        return $this;
    }

    public function getHeatingSystem(): ?string
    {
        return $this->heatingSystem;
    }

    public function setHeatingSystem(?string $heatingSystem): self
    {
        $this->heatingSystem = $heatingSystem;

        return $this;
    }

    public function getExistingInstallation(): ?string
    {
        return $this->existingInstallation;
    }

    public function setExistingInstallation(?string $existingInstallation): self
    {
        $this->existingInstallation = $existingInstallation;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(?string $fileName): self
    {
        $this->fileName = $fileName;

        return $this;
    }

    public function getFileSize(): ?string
    {
        return $this->fileSize;
    }

    public function setFileSize(?string $fileSize): self
    {
        $this->fileSize = $fileSize;

        return $this;
    }

    public function setFile(?File $file): self
    {
        $this->file = $file;

        if (null !== $file) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }
}
