<?php

namespace App\Services;

use App\Models\Profile;

class ProfileService
{
    public function update(Profile $profile, array $data): Profile
    {
        $skills = $data['skills'] ?? [];
        $languages = $data['languages'] ?? [];

        unset($data['skills'], $data['languages']);

        $profile->update($data);

        $profile->skills()->sync($skills);
        $profile->languages()->sync($languages);

        return $profile;
    }

    public function create(array $data): Profile
    {
        $skills = $data['skills'] ?? [];
        $languages = $data['languages'] ?? [];

        unset($data['skills'], $data['languages']);

        $profile = Profile::create($data);

        $profile->skills()->sync($skills);
        $profile->languages()->sync($languages);
        return $profile;
    }
}