<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\SearchService;

class DashboardController extends Controller
{
    public function __construct(
        private SearchService $searchService
    ) {}

    public function customerDashboard(Request $request)
    {
        $searchTerm = $request->get('search', '');
        $jobs = $this->searchService->searchJobs($searchTerm);
        
        return Inertia::render('customer/dashboard.page', [
            'jobs' => $jobs,
        ]);
    }

    public function freelancerDashboard(Request $request)
    {
        $searchTerm = $request->get('search', '');
        $gigs = $this->searchService->searchGigs($searchTerm);
        
        return Inertia::render('freelance/dashboard.page', [
            'gigs' => $gigs,
        ]);
    }
}
