<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\StoreRequest;

class ProjectController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $projects = $user->projects()->where('is_active', true)->get();

        return response()->json([
            'projects' => $projects,
        ]);
    }

    public function show($id)
    {
       $project = Project::findOrFail($id);

       return response()->json([
        'project' => $project,
       ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $project = Project::create($data);

        return response()->json([
            'project' => $project,
        ]);
    }

    public function update(StoreRequest $request, Project $project)
    {
        $data = $request->validated();

        $project->update($data);

        return response()->json([
            'project' => $project,
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }

    public function archive(Project $project)
    {
        $project->archive();

        return response()->json([
            'message' => 'Project archived successfully',
        ]);
    }

    public function activate(Project $project)
    {
        $project->activate();

        return response()->json([
            'message' => 'Project activated successfully',
        ]);
    }
    public function status(Project $project, $status)
    {
        $project->status($status);

        return response()->json([
            'message' => 'Project status updated successfully',
        ]);
    }
}
