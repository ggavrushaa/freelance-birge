<?php

namespace App\Services\Dashboard;

use App\Models\User;
use App\Services\Dashboard\Contracts\DashboardStrategyInterface;
use App\Services\Dashboard\Strategies\CustomerDashboardStrategy;
use App\Services\Dashboard\Strategies\FreelancerDashboardStrategy;

class DashboardService
{
    private array $strategies = [];

    public function __construct(
        CustomerDashboardStrategy $customerStrategy,
        FreelancerDashboardStrategy $freelancerStrategy
    ) {
        $this->strategies = [
            'customer' => $customerStrategy,
            'freelancer' => $freelancerStrategy,
        ];
    }

    public function getDashboardData(User $user, string $searchTerm = ''): array
    {
        $role = $user->role;
        $strategy = $this->strategies[$role] ?? $this->strategies['customer'];

        return $strategy->getData($searchTerm);
    }
}