<?php

namespace App\Http\Controllers;

use App\Models\Disput;
use App\Http\Requests\Disput\StoreRequest;

class DisputController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $disputs = $user->disputs()->get();

        return response()->json([
            'disputs' => $disputs,
        ]);
    }
    
    public function show($id)
    {
        $disput = Disput::findOrFail($id);

        return response()->json([
            'disput' => $disput,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $disput = Disput::create($data);

        return response()->json([
            'disput' => $disput,
        ]);
    }

    public function update(StoreRequest $request, Disput $disput)
    {
        $data = $request->validated();

        $disput->update($data);

        return response()->json([
            'disput' => $disput,
        ]);
    }

    public function destroy(Disput $disput)
    {
        $disput->delete();

        return response()->json([
            'message' => 'Disput deleted successfully',
        ]);
    }
}
