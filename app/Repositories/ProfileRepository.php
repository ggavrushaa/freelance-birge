<?php

namespace App\Repositories;

use App\Models\Profile;
use App\Models\User;

class ProfileRepository
{
    public function getProfile(User $user)
    {
        return $user->profile()->first();
    }

    public function getProfileWithRelations(User $user)
    {
        return $user->profile()->with('labels', 'languages', 'skills')->first();
    }

    public function getLabels(Profile $profile)
    {
        return $profile->labels;
    }

    public function getLanguages(Profile $profile)
    {
        return $profile->languages;
    }

    public function getSkills(Profile $profile)
    {
        return $profile->skills;
    }
}