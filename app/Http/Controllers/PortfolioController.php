<?php

namespace App\Http\Controllers;

use App\Enums\LanguageEnum;
use App\Enums\SkillEnum;
use App\Repositories\PortfolioRepository;
use App\Repositories\ProfileRepository;
use Inertia\Inertia;
use App\Models\Portfolio;
use App\Http\Requests\Portfolio\StoreRequest;
use App\Services\PortfolioService;
use App\Services\JobAttachmentService;

class PortfolioController extends Controller
{
    public function __construct(
        private PortfolioRepository $repository,
        private ProfileRepository $profileRepository,
        private PortfolioService $service,
        private JobAttachmentService $attachmentService,
    ) {
    }

    public function index()
    {
        return Inertia::render('portfolio/index.page', [
            'portfolios' => $this->repository->getPortfolios(),
        ]);
    }

    public function show(Portfolio $portfolio)
    {
        return Inertia::render('portfolio/show.page', [
            'portfolio' => $this->repository->getPortfolio($portfolio),
        ]);
    }

    public function create()
    {
        return Inertia::render('portfolio/create.page',[
            "profile" => $this->profileRepository->getProfile(auth()->user()),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->attachmentService->uploadPhoto(
                $request->file('image')
            );
        }

        $portfolio = $this->service->create($data);

        return redirect()->route('portfolio.show', $portfolio);
    }

    public function edit(Portfolio $portfolio)
    {
        return Inertia::render('portfolio/edit.page', [
            'portfolio' => $this->repository->getPortfolio($portfolio),
            "profile" => $this->profileRepository->getProfile(auth()->user()),
        ]);
    }

    public function update(StoreRequest $request, Portfolio $portfolio)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->attachmentService->uploadPhoto(
                $request->file('image')
            );
        }
        $this->service->update($portfolio, $data);

        return redirect()->route('portfolio.show', $portfolio);
    }

    public function destroy(Portfolio $portfolio)
    {
        $this->service->delete($portfolio);

        return redirect()->route('portfolio.index');
    }


}
