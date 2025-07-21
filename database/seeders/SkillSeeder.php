<?php

namespace Database\Seeders;

use App\Enums\SkillEnum;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = SkillEnum::cases();

        foreach ($skills as $skill) {
            Skill::create([
                'name' => $skill->label(),
            ]);
        }
    }
}
