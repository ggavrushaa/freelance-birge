<?php

namespace App\Http\Controllers;

use App\Enums\TariffAdditionalOptionsEnum;
use Inertia\Inertia;
use App\Services\JobAttachmentService;
use App\Repositories\FreelanceGigRepository;
use App\Http\Requests\FreelanceGig\StoreRequest;
use App\Services\FreelanceGigService;
use Illuminate\Http\Request;
use App\Services\SearchService;

class FreelanceGigController extends Controller
{
    public function __construct(
        private FreelanceGigRepository $repository,
        private JobAttachmentService $attachmentService,
        private FreelanceGigService $service,
        private SearchService $searchService,
    ) {
    }

    public function index(Request $request)
    {
        return Inertia::render('freelance/index.page', [
            'gigs' => $this->searchService->searchGigs( $request->get('search', '')),
        ]);
    }

    public function create()
    {
        return Inertia::render('freelance/gig/create.page', [
            'categories' => $this->repository->getCategories(),
            'additionalOptions' => TariffAdditionalOptionsEnum::toArray(),
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

        $gig = $this->service->createFreelanceGig($data);
        return redirect()->route('freelance-gig.show', $gig);
    }

    public function show($id)
    {
        $gig = auth()->user()->freelanceGigs()->with('tariffs')->findOrFail($id);

        return Inertia::render('freelance/gig/show.page', [
            'gig' => $gig,
        ]);
    }

    public function edit($id)
    {
        $gig = auth()->user()->freelanceGigs()->with('tariffs')->findOrFail($id);

        return Inertia::render('freelance/gig/edit.page', [
            'gig' => $gig,
            'categories' => $this->repository->getCategories(),
        ]);
    }

    public function update(StoreRequest $request, $id)
    {
        $gig = auth()->user()->freelanceGigs()->findOrFail($id);
        $gig->update($request->validated());

        return redirect()->route('freelance-gig.show', $gig)->with('success', 'Работа успешно обновлена.');
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
