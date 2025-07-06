<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Enums\CategoryEnum;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    protected $categories = [
        CategoryEnum::class,
    ];

    public function run(): void
    {
        foreach ($this->categories as $category) {
            foreach ($category::cases() as $case) {
                Category::updateOrCreate(
                    ['slug' => $case->value],
                    [
                        'name' => $case->label(),
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
