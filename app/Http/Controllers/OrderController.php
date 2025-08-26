<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{

    public function page()
    {
        return Inertia::render('order/index.page');
    }

    public function archive()
    {
        return Inertia::render('order/archive.page');
    }

    public function index()
    {
        $user = auth()->user();
        $role = $user->role;

        if ($role === 'customer') {
            $orders = $user->customerJobs()->where('is_active', true)->get();
            $archive = $user->customerJobs()->where('is_active', false)->get();
        } else {
            $orders = $user->freelanceGigs()->where('is_active', true)->with('tariffs')->get();
        }

        return response()->json([
            'orders' => $orders,
            'archive' => $archive ?? null,
        ]);
    }

    public function show($id)
    {
        $user = auth()->user();
        $role = $user->role;

        if ($role === 'customer') {
            $order = $user->customerJobs()->with('author')->findOrFail($id);
        } else {
            $order = $user->freelanceGigs()->with("tariffs", "freelancer")->findOrFail($id);
        }

        return Inertia::render('order/show.page', [
            'order' => $order,
        ]);
    }
}
