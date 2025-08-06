<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\Dashboard\DashboardService;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService
    ) {
    }

    public function dashboard(Request $request)
    {
        $user = auth()->user();
        $searchTerm = $request->get('search', '');
        $categoryId = $request->get('category_id', null);

        $dashboardData = $this->dashboardService->getDashboardData($user, $searchTerm, $categoryId);

        return Inertia::render('dashboard.page', $dashboardData);
    }
}
