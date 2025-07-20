<?php

namespace App\Services;

use App\Models\Profile;

class ProfileService
{
    public function updateProfile(Profile $profile, array $data): Profile
    {
        $skills = $data['skills'] ?? [];
        $languages = $data['languages'] ?? [];

        unset($data['skills'], $data['languages']);

        $profile->update($data);

        $profile->skills()->sync($skills);
        $profile->languages()->sync($languages);

        return $profile;
    }
}