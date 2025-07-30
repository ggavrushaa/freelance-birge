<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\Role;
use FurqanSiddiqui\BIP39\BIP39;
use Illuminate\Support\Facades\Auth;
use FurqanSiddiqui\BIP39\Language\English;
use BitWasp\Bitcoin\Mnemonic\MnemonicFactory;

class UserRegistrationService
{
    public function register(array $data)
    {
        $user = User::create([
            ...$data,
            'seed_phrase' => $this->generateSeedPhrase(),
        ]);

        $customerRole = Role::where('slug', 'customer')->first();
        if ($customerRole) {
            $user->roles()->attach($customerRole->id);
        }

        return $user;
    }

    public function validateSeedPhrase(User $user, array $words): bool
    {
        if (!$user->seed_phrase) {
            return false;
        }

        foreach ($words as $word) {
            if (!in_array($word, $user->seed_phrase)) {
                return false;
            }
        }

        return true;
    }
    public function createPinCode(User $user, string $pinCode): void
    {
        $user->update(['pin_code' => $pinCode]);
    }
    public function verifyPinCode(User $user, $pinCode): bool
    {
        if ($user->isPinCodeBlocked()) {
            return false;
        }

        if ($user->pin_code !== $pinCode) {
            $this->handleFailedAttempt($user);
            return false;
        }

        $this->resetAttempts($user);
        return true;
    }

    public function generateIndexes(): array
    {
        return array_rand(range(1, 12), 3);
    }

    protected function generateSeedPhrase(): array
    {
        return BIP39::fromRandom(English::getInstance(), 12)->words;
    }

    protected function handleFailedAttempt(User $user): void
    {
        $user->increment('pin_code_attempts');

        if ($user->pin_code_attempts >= 3) {
            $user->update([
                'pin_code_blocked_until' => now()->addMinutes(15),
                'pin_code_attempts' => 0,
            ]);
        }
    }

    protected function resetAttempts(User $user): void
    {
        $user->update([
            'pin_code_attempts' => 0,
            'pin_code_blocked_until' => null,
        ]);
    }

}
