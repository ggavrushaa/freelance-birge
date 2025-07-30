<?php

namespace App\Services;

use App\Models\User;
use App\Models\Role;

class RoleService
{
    public function assignRole(User $user, string $roleSlug): void
    {
        $role = Role::where('slug', $roleSlug)->first();

        if ($role) {
            $user->roles()->sync([$role->id]);
        }
    }

    public function hasRole(User $user, string $roleSlug): bool
    {
        return $user->hasRole($roleSlug);
    }

    public function getUserRole(User $user): ?string
    {
        $role = $user->roles()->first();
        return $role ? $role->slug : null;
    }

    public function isCustomer(User $user): bool
    {
        return $this->hasRole($user, 'customer');
    }

    public function isFreelancer(User $user): bool
    {
        return $this->hasRole($user, 'freelancer');
    }
}