<?php

namespace App\Services\Auth;
class LoginService
{
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

}
