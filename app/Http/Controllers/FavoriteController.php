<?php

namespace App\Http\Controllers;

use App\Services\Favorite\FavoriteService;
use App\Http\Requests\Favorite\ToggleRequest;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function __construct(
        private FavoriteService $favoriteService
    ) {
    }

    public function index()
    {
        $user = auth()->user();
        $favorites = $this->favoriteService->getUserFavorites($user);

        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    public function toggle(ToggleRequest $request)
    {
        $user = auth()->user();
        $data = $request->validated();

        try {
            $result = $this->favoriteService->toggle(
                $user,
                $data['favorable_type'],
                $data['favorable_id']
            );

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 400);
        }
    }

    public function check(Request $request)
    {
        $user = auth()->user();
        $favorableType = $request->input('favorable_type');
        $favorableId = $request->input('favorable_id');

        if (!$favorableType || !$favorableId) {
            return response()->json([
                'message' => 'Favorable type and ID are required',
            ], 400);
        }

        $isFavorited = $this->favoriteService->isFavorited($user, $favorableType, $favorableId);

        return response()->json([
            'is_favorited' => $isFavorited,
        ]);
    }

    public function customerJobs()
    {
        $user = auth()->user();
        $favorites = $this->favoriteService->getUserFavoriteCustomerJobs($user);

        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    public function freelanceGigs()
    {
        $user = auth()->user();
        $favorites = $this->favoriteService->getUserFavoriteFreelanceGigs($user);

        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    public function tariffs()
    {
        $user = auth()->user();
        $favorites = $this->favoriteService->getUserFavoriteTariffs($user);

        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    public function tariffsLiked($tariffId)
    {
        $result = $this->favoriteService->getTariffLikes($tariffId);

        return response()->json($result);
    }

    public function customerJobsLiked($jobId)
    {
        $result = $this->favoriteService->getCustomerJobLikes($jobId);

        return response()->json($result);
    }

    public function freelanceGigsLiked($gigId)
    {
        $result = $this->favoriteService->getFreelanceGigLikes($gigId);

        return response()->json($result);
    }
}
