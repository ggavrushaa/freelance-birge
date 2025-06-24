<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\CustomerJob\StoreRequest;

class CustomerJobController extends Controller
{
    public function index()
    {
        return Inertia::render('job/index.page', [
            'jobs' => auth()->user()->jobs,
        ]);
    }

    public function create()
    {
        return Inertia::render('job/create.page');
    }

    public function store(StoreRequest $request)
    {
        $job = auth()->user()->jobs()->create($request->validated());

        return redirect()->route('jobs.show', $job)->with('success', 'Работа успешно создана.');
    }

    public function show($id)
    {
        $job = auth()->user()->jobs()->findOrFail($id);

        return Inertia::render('job/show.page', [
            'job' => $job,
        ]);
    }

    public function edit($id)
    {
        $job = auth()->user()->jobs()->findOrFail($id);

        return Inertia::render('job/edit.page', [
            'job' => $job,
        ]);
    }
    public function update(StoreRequest $request, $id)
    {
        $job = auth()->user()->jobs()->findOrFail($id);
        $job->update($request->validated());

        return redirect()->route('jobs.show', $job)->with('success', 'Работа успешно обновлена.');
    }

    public function destroy($id)
    {
        $job = auth()->user()->jobs()->findOrFail($id);
        $job->delete();

        return redirect()->route('jobs.index')->with('success', 'Работа успешно удалена.');
    }
}
