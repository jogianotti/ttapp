<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 11, nullable: true)]
    private ?string $cuit = null;

    #[ORM\Column(length: 8, nullable: true)]
    private ?string $dni = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?DateTimeInterface $startDate = null;

    #[ORM\Column(length: 255)]
    private ?string $phoneNumber = null;

    #[Ignore]
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Work::class)]
    private Collection $works;

    #[Ignore]
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: ServiceRequest::class)]
    private Collection $serviceRequests;

    #[Ignore]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[Ignore]
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: WorkRequest::class)]
    private Collection $workRequests;

    public function __construct()
    {
        $this->works = new ArrayCollection();
        $this->serviceRequests = new ArrayCollection();
        $this->workRequests = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCuit(): ?string
    {
        return $this->cuit;
    }

    public function setCuit(?string $cuit): self
    {
        $this->cuit = $cuit;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDni(): ?string
    {
        return $this->dni;
    }

    public function setDni(?string $dni): self
    {
        $this->dni = $dni;

        return $this;
    }

    public function getStartDate(): ?DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    /**
     * @return Collection<int, Work>
     */
    public function getWorks(): Collection
    {
        return $this->works;
    }

    public function addWork(Work $work): self
    {
        if (!$this->works->contains($work)) {
            $this->works->add($work);
            $work->setClient($this);
        }

        return $this;
    }

    public function removeWork(Work $work): self
    {
        if ($this->works->removeElement($work)) {
            // set the owning side to null (unless already changed)
            if ($work->getClient() === $this) {
                $work->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ServiceRequest>
     */
    public function getServiceRequests(): Collection
    {
        return $this->serviceRequests;
    }

    public function addServiceRequest(ServiceRequest $serviceRequest): self
    {
        if (!$this->serviceRequests->contains($serviceRequest)) {
            $this->serviceRequests->add($serviceRequest);
            $serviceRequest->setClient($this);
        }

        return $this;
    }

    public function removeServiceRequest(ServiceRequest $serviceRequest): self
    {
        if ($this->serviceRequests->removeElement($serviceRequest)) {
            // set the owning side to null (unless already changed)
            if ($serviceRequest->getClient() === $this) {
                $serviceRequest->setClient(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, WorkRequest>
     */
    public function getWorkRequests(): Collection
    {
        return $this->workRequests;
    }

    public function addWorkRequest(WorkRequest $workRequest): self
    {
        if (!$this->workRequests->contains($workRequest)) {
            $this->workRequests->add($workRequest);
            $workRequest->setClient($this);
        }

        return $this;
    }

    public function removeWorkRequest(WorkRequest $workRequest): self
    {
        if ($this->workRequests->removeElement($workRequest)) {
            // set the owning side to null (unless already changed)
            if ($workRequest->getClient() === $this) {
                $workRequest->setClient(null);
            }
        }

        return $this;
    }
}
