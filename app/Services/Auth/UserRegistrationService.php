<?php

namespace App\Services\Auth;

use App\Models\User;
use FurqanSiddiqui\BIP39\BIP39;
use BitWasp\Bitcoin\Mnemonic\MnemonicFactory;
use FurqanSiddiqui\BIP39\Language\English;

class UserRegistrationService
{
    public function register(array $data): User
    {
        $seed = $this->generateSeedPhrase();

        $user = User::create([
            ...$data,
            'seed_phrase' => $seed,
        ]);

        return $user;
    }

    public function generateSeedPhrase(): array
    {
        $mnemonic = BIP39::fromRandom(English::getInstance(), 12);
        return $mnemonic->words;
    }
}
