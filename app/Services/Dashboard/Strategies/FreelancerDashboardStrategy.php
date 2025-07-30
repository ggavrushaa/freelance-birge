<?php

namespace App\Services\Dashboard\Strategies;

use App\Services\Dashboard\Contracts\DashboardStrategyInterface;
use App\Services\SearchService;

class FreelancerDashboardStrategy implements DashboardStrategyInterface
{
    public function __construct(
        private SearchService $searchService
    ) {
    }

    public function getData(string $searchTerm = ''): array
    {
        return [
            'gigs' => $this->searchService->searchGigs($searchTerm),
            'user_role' => 'freelancer',
        ];
    }
}