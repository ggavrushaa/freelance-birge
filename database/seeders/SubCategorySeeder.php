<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use App\Enums\SubCategoryEnum;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        foreach (SubCategoryEnum::cases() as $subCategory) {
            $category = Category::where('slug', $subCategory->category()->value)->first();

            if ($category) {
                SubCategory::updateOrCreate(
                    ['slug' => $subCategory->value],
                    [
                        'name' => $subCategory->label(),
                        'category_id' => $category->id,
                    ]
                );
            }
        }
    }
}
