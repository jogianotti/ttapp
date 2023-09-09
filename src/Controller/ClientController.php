<?php

namespace App\Controller;

use App\Entity\ServiceRequest;
use App\Form\ServiceRequestType;
use App\Repository\BoilerRepository;
use App\Repository\ServiceRequestRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/client')]
class ClientController extends AbstractController
{
    #[Route('/check', name: 'app_client_check')]
    public function index(): Response
    {
        return new JsonResponse();
    }

    #[Route('/boilers', name: 'app_client_get_boilers', methods: ['GET'])]
    public function getBoilers(BoilerRepository $boilerRepository): Response
    {
        return $this->json($boilerRepository->findAll());
    }

    #[Route('/request_service', name: 'app_client_request_service', methods: ['POST'])]
    public function requestService(
        Request $request,
        ServiceRequestRepository $serviceRequestRepository,
        SluggerInterface $slugger
    ): Response {
        $serviceRequest = new ServiceRequest();
        $form = $this->createForm(ServiceRequestType::class, $serviceRequest);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $serviceRequest->setImageFile($request->files->get('file'));

            $serviceRequestRepository->save($serviceRequest, true);

            return new JsonResponse(status: Response::HTTP_CREATED);
        }

        return new JsonResponse(status: Response::HTTP_BAD_REQUEST);
    }
}
