<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $role = $user->role;

        if ($role === 'customer') {
            $orders = $user->customerJobs()->get();
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
            $order = $user->customerJobs()->findOrFail($id);
        } else {
            $order = $user->freelanceGigs()->findOrFail($id);
        }

        return response()->json([
            'order' => $order,
        ]);
    }
}
