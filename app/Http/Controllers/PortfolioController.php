<?php

namespace App\Http\Controllers;

use App\Repositories\PortfolioRepository;
use Inertia\Inertia;
use App\Models\Portfolio;
use App\Http\Requests\Portfolio\StoreRequest;
use App\Services\PortfolioService;
use App\Services\JobAttachmentService;

class PortfolioController extends Controller
{
    public function __construct(
        private PortfolioRepository $repository,
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
        return Inertia::render('portfolio/create.page');
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->attachmentService->uploadPhoto(
                $request->file('image')
            );
        }

        $portfolio = $this->service->createPortfolio($data);

        return redirect()->route('portfolio.show', $portfolio);
    }

    public function edit(Portfolio $portfolio)
    {
        return Inertia::render('portfolio/edit.page', [
            'portfolio' => $this->repository->getPortfolio($portfolio),
        ]);
    }

    public function update(StoreRequest $request, Portfolio $portfolio)
    {
        $this->service->updatePortfolio($portfolio, $request->validated());

        return redirect()->route('portfolio.show', $portfolio);
    }

    public function destroy(Portfolio $portfolio)
    {
        $this->service->deletePortfolio($portfolio);

        return redirect()->route('portfolio.index');
    }


}
