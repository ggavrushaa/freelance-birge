<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Services\Auth\UserRegistrationService;

class LoginService
{
    public function __construct(protected UserRegistrationService $registrationService)
    {
    }

    public function login(array $credentials): bool
    {
        if (auth()->attempt($credentials)) {
            return true;
        }

        return false;
    }

    public function logout(): void
    {
        auth()->logout();
    }

    public function isAuthenticated(): bool
    {
        return auth()->check();
    }

    public function validateCompleteSeedPhrase(User $user, array $words, array $indices): bool
    {
        return $this->registrationService->validateSeedPhrase($user, $words, $indices);
    }
}
