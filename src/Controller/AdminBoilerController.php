<?php

namespace App\Controller;

use App\Entity\Boiler;
use App\Form\BoilerType;
use App\Repository\BoilerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/boilers')]
class AdminBoilerController extends AbstractController
{
    #[Route('/', name: 'app_boiler_index', methods: ['GET'])]
    public function index(BoilerRepository $boilerRepository): Response
    {
        return $this->json($boilerRepository->findAll());
    }

    #[Route('/new', name: 'app_boiler_new', methods: ['GET', 'POST'])]
    public function new(Request $request, BoilerRepository $boilerRepository): Response
    {
        $boiler = new Boiler();
        $form = $this->createForm(BoilerType::class, $boiler);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $boilerRepository->save($boiler, true);

            return new JsonResponse(data: ['id' => $boiler->getId()], status: Response::HTTP_CREATED);
        }

        return new JsonResponse(data: ['errors' => $form->getErrors()], status: Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: 'app_boiler_show', methods: ['GET'])]
    public function show(Boiler $boiler): Response
    {
        return $this->json(data: $boiler);
    }

    #[Route('/{id}/edit', name: 'app_boiler_edit', methods: ['PUT'])]
    public function edit(Request $request, Boiler $boiler, BoilerRepository $boilerRepository): Response
    {
        $form = $this->createForm(BoilerType::class, $boiler);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $boilerRepository->save($boiler, true);

            return new JsonResponse(status: Response::HTTP_OK);
        }

        return new JsonResponse(data: ['errors' => $form->getErrors()], status: Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: 'app_boiler_delete', methods: ['DELETE'])]
    public function delete(Request $request, Boiler $boiler, BoilerRepository $boilerRepository): Response
    {
        $boilerRepository->remove($boiler, true);

        return new JsonResponse(status: Response::HTTP_NO_CONTENT);
    }
}
