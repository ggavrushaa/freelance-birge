<?php

namespace App\Services\Dashboard\Contracts;

interface DashboardStrategyInterface
{
    public function getData(string $searchTerm = ''): array;
}