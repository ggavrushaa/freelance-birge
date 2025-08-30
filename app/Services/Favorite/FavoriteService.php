<?php

namespace App\Services\Favorite;

use App\Models\Favorite;
use App\Models\CustomerJob;
use App\Models\FreelanceGig;
use App\Models\Tariff;
use App\Models\User;

class FavoriteService
{
    private function getModelClass(string $favorableType): string
    {
        return match ($favorableType) {
            'customer_job' => CustomerJob::class,
            'freelance_gig' => FreelanceGig::class,
            'tariff' => Tariff::class,
            default => throw new \InvalidArgumentException('Invalid favorable type'),
        };
    }

    private function getModel(string $favorableType, int $favorableId)
    {
        $modelClass = $this->getModelClass($favorableType);
        return $modelClass::find($favorableId);
    }

    public function toggle(User $user, string $favorableType, int $favorableId): array
    {
        $item = $this->getModel($favorableType, $favorableId);

        if (!$item) {
            throw new \Exception('Item not found', 404);
        }

        $modelClass = $this->getModelClass($favorableType);

        $existingFavorite = Favorite::where([
            'user_id' => $user->id,
            'favorable_type' => $modelClass,
            'favorable_id' => $favorableId,
        ])->first();

        if ($existingFavorite) {
            $existingFavorite->delete();
            return [
                'is_favorited' => false,
                'message' => 'Removed from favorites',
            ];
        } else {
            Favorite::create([
                'user_id' => $user->id,
                'favorable_type' => $modelClass,
                'favorable_id' => $favorableId,
            ]);
            return [
                'is_favorited' => true,
                'message' => 'Added to favorites',
            ];
        }
    }

    public function isFavorited(User $user, string $favorableType, int $favorableId): bool
    {
        $modelClass = $this->getModelClass($favorableType);

        return Favorite::where([
            'user_id' => $user->id,
            'favorable_type' => $modelClass,
            'favorable_id' => $favorableId,
        ])->exists();   
    }

    public function getUserFavorites(User $user)
    {
        return $user->favorites()->with('favorable')->get();
    }

    public function getUserFavoritesByType(User $user, string $favorableType)
    {
        $modelClass = $this->getModelClass($favorableType);

        return $user->favorites()
            ->where('favorable_type', $modelClass)
            ->with('favorable')
            ->get();
    }

    public function getItemLikes(string $favorableType, int $favorableId)
    {
        $modelClass = $this->getModelClass($favorableType);

        $favorites = Favorite::where([
            'favorable_type' => $modelClass,
            'favorable_id' => $favorableId,
        ])->with('user')->get();

        return [
            'favorites' => $favorites,
            'users' => $favorites->pluck('user'),
            'count' => $favorites->count(),
        ];
    }

    public function getUserFavoriteCustomerJobs(User $user)
    {
        return $this->getUserFavoritesByType($user, 'customer_job');
    }

    public function getUserFavoriteFreelanceGigs(User $user)
    {
        return $this->getUserFavoritesByType($user, 'freelance_gig');
    }

    public function getUserFavoriteTariffs(User $user)
    {
        return $this->getUserFavoritesByType($user, 'tariff');
    }

    public function getTariffLikes(int $tariffId)
    {
        return $this->getItemLikes('tariff', $tariffId);
    }

    public function getCustomerJobLikes(int $jobId)
    {
        return $this->getItemLikes('customer_job', $jobId);
    }

    public function getFreelanceGigLikes(int $gigId)
    {
        return $this->getItemLikes('freelance_gig', $gigId);
    }
}
