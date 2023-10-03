<?php

namespace App\Controller;

use App\Repository\ServiceRequestRepository;
use App\Repository\WorkRequestRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class AdminController extends AbstractController
{
    #[Route('/check', name: 'app_admin_check')]
    public function index(Request $request): Response
    {
        return new JsonResponse();
    }

    #[Route('/service_requests', name: 'app_admin_service_requests', methods: ['GET'])]
    public function serviceRequests(ServiceRequestRepository $serviceRequestRepository): Response
    {
        return $this->json($serviceRequestRepository->findAllWithClient());
    }

    #[Route('/work_requests', name: 'app_admin_work_requests', methods: ['GET'])]
    public function workRequests(WorkRequestRepository $workRequestRepository): Response
    {
        return $this->json($workRequestRepository->findAllWithClient());
    }
}

