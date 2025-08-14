<?php

namespace App\Services;

use App\Models\CustomerJob;
use App\Models\FreelanceGig;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class FilterService
{
    public function applyJobFilters(Builder $query, array $filters): void
    {
        if (isset($filters['completion_time']) && $filters['completion_time'] !== 'all') {
            $this->applyCompletionTimeFilter($query, $filters['completion_time']);
        }

        if (isset($filters['express_mode']) && $filters['express_mode'] === 'true') {
            $query->where('express_mode', true);
        }


        if (isset($filters['premium_mode']) && $filters['premium_mode'] === 'true') {
            $query->where('premium_mode', true);
        }

        $query->where('is_active', true);
    }

    public function applyGigFilters(Builder $query, array $filters): void
    {

        if (isset($filters['completion_time']) && $filters['completion_time'] !== 'all') {
            $this->applyGigCompletionTimeFilter($query, $filters['completion_time']);
        }


        if (isset($filters['express_mode']) && $filters['express_mode'] === 'true') {
            $query->where('express_mode', true);
        }


        if (isset($filters['premium_mode']) && $filters['premium_mode'] === 'true') {
            $query->where('premium_mode', true);
        }


        if (isset($filters['seller_level']) && $filters['seller_level'] !== 'all') {
            $this->applySellerLevelFilter($query, $filters['seller_level']);
        }


        if (isset($filters['review_range']) && $filters['review_range'] !== 'all') {
            $this->applyReviewRangeFilter($query, $filters['review_range']);
        }

        $query->where('is_active', true);
    }

    private function applyCompletionTimeFilter(Builder $query, string $completionTime): void
    {
        switch ($completionTime) {
            case '1-2':
                $query->where('terms', '<=', 2);
                break;
            case '3-5':
                $query->whereBetween('terms', [3, 5]);
                break;
            case '7+':
                $query->where('terms', '>=', 7);
                break;
        }
    }

    private function applyGigCompletionTimeFilter(Builder $query, string $completionTime): void
    {
        $query->whereHas('tariffs', function ($tariffQuery) use ($completionTime) {
            switch ($completionTime) {
                case '1-2':
                    $tariffQuery->where('terms', '<=', 2);
                    break;
                case '3-5':
                    $tariffQuery->whereBetween('terms', [3, 5]);
                    break;
                case '7+':
                    $tariffQuery->where('terms', '>=', 7);
                    break;
            }
        });
    }


    private function applySellerLevelFilter(Builder $query, string $sellerLevel): void
    {
        $query->whereHas('freelancer', function ($userQuery) use ($sellerLevel) {
            switch ($sellerLevel) {
                case 'novice':
                    $userQuery->where('completed_orders_count', '<=', 10);
                    break;
                case 'experienced':
                    $userQuery->whereBetween('completed_orders_count', [11, 50]);
                    break;
                case 'professional':
                    $userQuery->where('completed_orders_count', '>=', 50);
                    break;
            }
        });
    }

    private function applyReviewRangeFilter(Builder $query, string $reviewRange): void
    {
        $query->whereHas('freelancer', function ($userQuery) use ($reviewRange) {
            switch ($reviewRange) {
                case '0-5':
                    $userQuery->where('rating', '<=', 5);
                    break;
                case '10-50':
                    $userQuery->whereBetween('rating', [10, 50]);
                    break;
                case '50-100':
                    $userQuery->whereBetween('rating', [50, 100]);
                    break;
            }
        });
    }

    public function getFilterOptions(): array
    {
        return [
            'completion_time' => [
                'label' => 'Срок выполнения',
                'options' => [
                    'all' => 'Все',
                    '1-2' => '1-2 дня',
                    '3-5' => '3-5 дня',
                    '7+' => '7+ дней',
                ],
            ],
            'express_mode' => [
                'label' => 'Экспресс-проекты',
                'options' => [
                    'all' => 'Все',
                    'true' => 'Экспресс-проекты',
                ],
            ],
            'premium_mode' => [
                'label' => 'Premium',
                'options' => [
                    'all' => 'Все',
                    'true' => 'Premium',
                ],
            ],
            'seller_level' => [
                'label' => 'Уровень продавца',
                'options' => [
                    'all' => 'Все',
                    'novice' => 'Новичок',
                    'experienced' => 'Опытный',
                    'professional' => 'Профи',
                ],
            ],
            'review_range' => [
                'label' => 'Диапазон отзывов',
                'options' => [
                    'all' => 'Все',
                    '0-5' => '0-5 отзывов',
                    '10-50' => '10-50 отзывов',
                    '50-100' => '50-100 отзывов',
                ],
            ],
            'similar' => [
                'label' => 'Похожие',
                'options' => [
                    'all' => 'Все',
                    'true' => 'Похожие',
                ],
            ],
        ];
    }

    public function getSimilarJobSuggestions(string $searchTerm, int $limit = 10): array
    {
        $suggestions = CustomerJob::where('name', 'like', '%' . $searchTerm . '%')
            ->where('is_active', true)
            ->select('name')
            ->distinct()
            ->limit($limit)
            ->pluck('name')
            ->toArray();

        return $suggestions;
    }

    public function getSimilarGigSuggestions(string $searchTerm, int $limit = 10): array
    {
        $suggestions = FreelanceGig::where('name', 'like', '%' . $searchTerm . '%')
            ->where('is_active', true)
            ->select('name')
            ->distinct()
            ->limit($limit)
            ->pluck('name')
            ->toArray();

        return $suggestions;
    }
}