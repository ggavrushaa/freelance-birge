<?php

namespace App\Services\Dashboard\Strategies;

use App\Services\Dashboard\Contracts\DashboardStrategyInterface;
use App\Services\SearchService;

class CustomerDashboardStrategy implements DashboardStrategyInterface
{
    public function __construct(
        private SearchService $searchService
    ) {
    }

    public function getData(string $searchTerm = ''): array
    {
        return [
            'jobs' => $this->searchService->searchJobs($searchTerm),
            'user_role' => 'customer',
        ];
    }
}