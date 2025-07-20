<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function customerDashboard()
    {
        return Inertia::render('customer/dashboard.page', [
            'jobs' => auth()->user()->customerJobs()->get(),
        ]);
    }

    public function freelancerDashboard()
    {
        return Inertia::render('freelancer/dashboard.page', [
            'gigs' => auth()->user()->freelanceGigs()->get(),
        ]);
    }
}
