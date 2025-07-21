<?php

namespace Database\Seeders;

use App\Enums\LanguagesEnum;
use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $languages = LanguagesEnum::cases();

        foreach ($languages as $language) {
            Language::create([
                'code' => $language->value,
                'name' => $language->label(),
            ]);
        }
    }
}
