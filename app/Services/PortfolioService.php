<?php

namespace App\Services;

use App\Models\Portfolio;

class PortfolioService
{
    public function createPortfolio(array $data): Portfolio
    {
        $portfolio = Portfolio::create($data);
        return $portfolio;
    }

    public function updatePortfolio(Portfolio $portfolio, array $data): Portfolio
    {
        $portfolio->update($data);
        return $portfolio;
    }

    public function deletePortfolio(Portfolio $portfolio): void
    {
        $portfolio->is_published = false;
        $portfolio->save();
    }
}