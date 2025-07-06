<?php

namespace App\Repositories;
use App\Models\User;
use App\Models\Category;

class FreelanceGigRepository
{
    public function getForUser(User $user, int $perPage = 20)
    {
        return $user->freelanceGigs()
            ->with(['category', 'subCategory', 'freelancer'])
            ->paginate($perPage);
    }

    public function getCategories()
    {
        return Category::with('subCategories')->get();
    }

}
