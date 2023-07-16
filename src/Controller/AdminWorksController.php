<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Event;
use App\Entity\EventImage;
use App\Entity\Work;
use App\Form\WorkType;
use App\Repository\EventImageRepository;
use App\Repository\EventRepository;
use App\Repository\WorkRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

#[Route('/admin/works/{client}')]
class AdminWorksController extends AbstractController
{
    #[Route('/', name: 'app_work_index', methods: ['GET'])]
    public function index(Client $client, WorkRepository $workRepository): Response
    {
        return $this->json($workRepository->findBy(['client' => $client]));
    }

    #[Route('/new', name: 'app_work_new', methods: ['POST'])]
    public function new(Request $request, Client $client, WorkRepository $workRepository): Response
    {
        $work = new Work();
        $form = $this->createForm(WorkType::class, $work);
        $form->handleRequest($request);

        $work->setClient($client);

        if ($form->isSubmitted() && $form->isValid()) {
            $workRepository->save($work, true);

            return new JsonResponse(data: ['id' => $work->getId()], status: Response::HTTP_CREATED);
        }

        return new JsonResponse(data: ['errors' => $form->getErrors()], status: Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{work}', name: 'app_work_show', methods: ['GET'])]
    public function show(Work $work): Response
    {
        return $this->json($work);
    }

    #[Route('/{work}/edit', name: 'app_work_edit', methods: ['PUT'])]
    public function edit(Request $request, Work $work, WorkRepository $workRepository): Response
    {
        $form = $this->createForm(WorkType::class, $work);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $workRepository->save($work, true);

            return new JsonResponse(status: Response::HTTP_OK);
        }

        return new JsonResponse(data: ['errors' => $form->getErrors()], status: Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{work}/events', name: 'app_work_events_index', methods: ['GET'])]
    public function allWorkEvents(
        Work $work,
        EventRepository $eventRepository
    ): Response {
        $events = $eventRepository->findBy([
            'work' => $work,
        ], [
            'date' => 'DESC',
            'id' => 'DESC',
        ]);

        $data = [];
        foreach ($events as $event) {
            $data[] = [
                'id' => $event->getId(),
                'date' => $event->getDate()?->format('d/m/Y'),
                'content' => $event->getContent(),
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('/{work}/events/upload_image', name: 'app_work_events_upload_image', methods: ['POST'])]
    public function workEventUploadImage(
        Request $request,
        Client $client,
        Work $work,
        EventImageRepository $eventImageRepository,
        UploaderHelper $uploaderHelper
    ): Response {
        if (!array_key_exists('file', $_FILES)) {
            return new JsonResponse(data: ['errors' => 'File not received'], status: Response::HTTP_BAD_REQUEST);
        }

        $eventImage = new EventImage();
        $eventImage->setImageFile(
            new UploadedFile($_FILES['file']['tmp_name'], $_FILES['file']['name'], $_FILES['file']['type'])
        );
        $eventImageRepository->save($eventImage, true);

        $path = $uploaderHelper->asset($eventImage);

        return new JsonResponse(data: ['location' => $path], status: Response::HTTP_CREATED);
    }

    #[Route('/{work}/events/new', name: 'app_work_events_new', methods: ['POST'])]
    public function workEventNew(
        Request $request,
        Client $client,
        Work $work,
        EventRepository $eventRepository
    ): Response {
        $data = json_decode($request->getContent());

        $event = new Event();
        $event->setWork($work);
        $event->setDate(new DateTime($data->date));
        $event->setContent($data->content);

        $eventRepository->save($event, true);

        return new JsonResponse();
    }

    #[Route('/{work}', name: 'app_work_delete', methods: ['DELETE'])]
    public function delete(Request $request, Work $work, WorkRepository $workRepository): Response
    {
        $workRepository->remove($work, true);

        return new JsonResponse(status: Response::HTTP_NO_CONTENT);
    }
}
