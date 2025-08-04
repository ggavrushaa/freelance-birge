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

    public function verifySeed(array $data): bool
    {
        dd($data);
        $isValid = $this->checkSeedPhrase($data['words']);

        if ($isValid) {
            return true;
        }

        return false;
    }

    public function isAuthenticated(): bool
    {
        return auth()->check();
    }

    protected function checkSeedPhrase(array $words): bool
    {
        dd($words);
        $user = auth()->user();

        if (!$user || !$user->seed_phrase) {
            return false;
        }

        $savedSeedPhrase = $user->seed_phrase;

        if (count($words) !== count($savedSeedPhrase)) {
            return false;
        }

        foreach ($words as $index => $word) {
            if ($word !== $savedSeedPhrase[$index]) {
                return false;
            }
        }

        return true;
    }
}
