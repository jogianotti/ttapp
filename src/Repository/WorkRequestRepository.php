<?php

namespace App\Repository;

use App\Entity\WorkRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<WorkRequest>
 *
 * @method WorkRequest|null find($id, $lockMode = null, $lockVersion = null)
 * @method WorkRequest|null findOneBy(array $criteria, array $orderBy = null)
 * @method WorkRequest[]    findAll()
 * @method WorkRequest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorkRequest::class);
    }

    public function save(WorkRequest $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(WorkRequest $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findAllWithClient()
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT w, c
            FROM App\Entity\WorkRequest w
            INNER JOIN w.client c
            ORDER BY w.id DESC'
        );

        return $query->getResult();
    }
}
