<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Http\Requests\Review\StoreRequest;

class ReviewController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $reviews = $user->reviews()->get();

        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    public function show($id)
    {
        $review = Review::findOrFail($id);

        return response()->json([
            'review' => $review,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $review = Review::create($data);

        return response()->json([
            'review' => $review,
        ]);
    }

    public function update(StoreRequest $request, Review $review)
    {
        $data = $request->validated();

        $review->update($data);

        return response()->json([
            'review' => $review,
        ]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully',
        ]);
    }
}
