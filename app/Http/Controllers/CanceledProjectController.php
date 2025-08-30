<?php

namespace App\Http\Controllers;

use App\Models\CanceledProject;
use App\Http\Requests\CanceledProject\StoreRequest;

class CanceledProjectController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $canceledProjects = $user->canceledProjects()->get();

        return response()->json([
            'canceledProjects' => $canceledProjects,
        ]);
    }

    public function show($id)
    {
        $canceledProject = CanceledProject::findOrFail($id);

        return response()->json([
            'canceledProject' => $canceledProject,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $canceledProject = CanceledProject::create($data);

        return response()->json([
            'canceledProject' => $canceledProject,
        ]);
    }
    public function update(StoreRequest $request, CanceledProject $canceledProject)
    {
        $data = $request->validated();

        $canceledProject->update($data);

        return response()->json([
            'canceledProject' => $canceledProject,
        ]);
    }
    public function destroy(CanceledProject $canceledProject)
    {
        $canceledProject->delete();

        return response()->json([
            'message' => 'Canceled project deleted successfully',
        ]);
    }
}
