<?php

namespace App\Services;

use App\Models\CustomerJob;
use App\Models\FreelanceGig;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SearchService
{
    public function searchJobs(string $searchTerm, int $perPage = 10, ?int $categoryId = null)
    {
        $query = CustomerJob::query();

        $this->applyTextSearch($query, $searchTerm, ['name', 'description',]);

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        return $query->with(['category', 'subCategory'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function searchGigs(string $searchTerm, int $perPage = 10, ?int $categoryId = null)
    {
        $query = FreelanceGig::query();

        $this->applyTextSearch($query, $searchTerm, ['name']);

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        return $query->with(['category', 'subCategory'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    private function applyTextSearch(Builder $query, string $searchTerm, array $fields): void
    {
        if (empty($searchTerm)) {
            return;
        }

        $query->where(function ($q) use ($searchTerm, $fields) {
            foreach ($fields as $field) {
                $q->orWhere($field, 'like', "%{$searchTerm}%");
            }
        });
    }


}