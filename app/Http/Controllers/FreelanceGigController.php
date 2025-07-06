<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\JobAttachmentService;
use App\Repositories\FreelanceGigRepository;
use App\Http\Requests\FreelanceGig\StoreRequest;

class FreelanceGigController extends Controller
{
    public function __construct(
        private FreelanceGigRepository $repository,
        private JobAttachmentService $attachmentService,
    ) {
    }

    public function index()
    {
        return Inertia::render('freelance/index.page', [
            'gigs' => $this->repository->getForUser(auth()->user()),
        ]);
    }

    public function create()
    {
        return Inertia::render('freelance/create.page', [
            'categories' => $this->repository->getCategories(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->attachmentService->uploadPhoto(
                $request->file('photo')
            );
        }

        $gig = auth()->user()->freelanceGigs()->create($data);

        return redirect()->route('freelance.show', $gig);
    }

    public function show($id)
    {
        $gig = auth()->user()->freelanceGigs()->findOrFail($id);

        return Inertia::render('freelance/show.page', [
            'gig' => $gig,
        ]);
    }

    public function edit($id)
    {
        $gig = auth()->user()->freelanceGigs()->findOrFail($id);

        return Inertia::render('freelance/edit.page', [
            'gig' => $gig,
            'categories' => $this->repository->getCategories(),
        ]);
    }

    public function update(StoreRequest $request, $id)
    {
        $gig = auth()->user()->freelanceGigs()->findOrFail($id);
        $gig->update($request->validated());

        return redirect()->route('freelance.show', $gig)->with('success', 'Работа успешно обновлена.');
    }

    public function destroy($id)
    {
        $gig = auth()->user()->freelanceGigs()->findOrFail($id);

        if ($gig->photo) {
            $this->attachmentService->deletePhoto($gig->photo);
        }

        $gig->delete();

        return redirect()->route('freelance.index')->with('success', 'Работа успешно удалена.');
    }

}
