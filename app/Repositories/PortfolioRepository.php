<?php

namespace App\Repositories;

use App\Models\Portfolio;

class PortfolioRepository
{
    public function getPortfolios()
    {
        return auth()->user()->profile->portfolios()->with('category', 'subCategory')->where('is_published', true)->get();
    }

    public function getPortfolio(Portfolio $portfolio)
    {
        return $portfolio->load('category', 'subCategory',);
    }
}