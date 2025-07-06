<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'color',
        'is_active',
    ];

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}
