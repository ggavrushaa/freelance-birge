<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\CustomerJob\StoreRequest;
use CustomerJobRepository;
use JobAttachmentService;

class CustomerJobController extends Controller
{
    public function __construct(
        private CustomerJobRepository $repository,
        private JobAttachmentService $attachmentService,
    ) {
    }

    public function index()
    {
        return Inertia::render('job/index.page', [
            'jobs' => $this->repository->getForUser(auth()->user()),
        ]);
    }

    public function create()
    {
        return Inertia::render('job/create.page');
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->attachmentService->uploadPhoto(
                $request->file('photo')
            );
        }

        $job = auth()->user()->customerJobs()->create($data);

        return redirect()->route('jobs.show', $job);
    }

    public function show($id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);

        return Inertia::render('job/show.page', [
            'job' => $job,
        ]);
    }

    public function edit($id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);

        return Inertia::render('job/edit.page', [
            'job' => $job,
        ]);
    }
    public function update(StoreRequest $request, $id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);
        $job->update($request->validated());

        return redirect()->route('jobs.show', $job)->with('success', 'Работа успешно обновлена.');
    }

    public function destroy($id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);

        if ($job->photo) {
            $this->attachmentService->deletePhoto($job->photo);
        }

        $job->delete();

        return redirect()->route('jobs.index')->with('success', 'Работа успешно удалена.');
    }
}
