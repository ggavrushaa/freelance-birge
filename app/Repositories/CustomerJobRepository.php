<?php

namespace App\Repositories;
use App\Models\User;

class CustomerJobRepository
{
    public function getForUser(User $user, int $perPage = 20)
    {
        return $user->customerJobs()
            ->with(['category', 'subCategory', 'freelancer', 'author'])
            ->paginate($perPage);
    }

}
