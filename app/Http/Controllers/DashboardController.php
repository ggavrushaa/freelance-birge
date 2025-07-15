<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('customer/dashboard.page', [
            'jobs' => auth()->user()->customerJobs()->get(),
        ]);
    }
}
