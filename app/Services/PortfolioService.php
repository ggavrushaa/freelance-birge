<?php

namespace App\Services;

use App\Models\Portfolio;

class PortfolioService
{
    public function create(array $data): Portfolio
    {
        $portfolio = Portfolio::create($data);
        return $portfolio;
    }

    public function update(Portfolio $portfolio, array $data): Portfolio
    {
        $portfolio->update($data);
        return $portfolio;
    }

    public function delete(Portfolio $portfolio): void
    {
        $portfolio->is_published = false;
        $portfolio->save();
    }
}