<?php

namespace App\Controller;

use App\Entity\Client;
use App\Form\ClientType;
use App\Repository\ClientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/clients')]
class AdminClientsController extends AbstractController
{
    #[Route('/', name: 'app_client_index', methods: ['GET'])]
    public function index(ClientRepository $clientRepository): Response
    {
        return $this->json($clientRepository->findAll());
    }

    #[Route('/new', name: 'app_client_new', methods: ['POST'])]
    public function new(Request $request, ClientRepository $clientRepository): Response
    {
        $client = new Client();
        $form = $this->createForm(ClientType::class, $client);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $clientRepository->save($client, true);

            return new JsonResponse(data: ['id' => $client->getId()], status: Response::HTTP_CREATED);
        }

        return new JsonResponse(data: ['errors' => $form->getErrors()], status: Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: 'app_client_show', methods: ['GET'])]
    public function show(Client $client): Response
    {
        return $this->json(data: $client);
    }

    #[Route('/{id}/edit', name: 'app_client_edit', methods: ['PUT'])]
    public function edit(Request $request, Client $client, ClientRepository $clientRepository): Response
    {
        $form = $this->createForm(ClientType::class, $client);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $clientRepository->save($client, true);

            return new JsonResponse(status: Response::HTTP_OK);
        }

        return new JsonResponse(data: ['errors' => $form->getErrors()], status: Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: 'app_client_delete', methods: ['POST'])]
    public function delete(Request $request, Client $client, ClientRepository $clientRepository): Response
    {
        $clientRepository->remove($client, true);

        return new JsonResponse(status: Response::HTTP_NO_CONTENT);
    }
}
