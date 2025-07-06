<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerJob extends Model
{
    protected $table = 'customer_jobs';
    protected $fillable = [
        'name',
        'description',
        'photo',
        'price',
        'terms',

        'is_active',
        'express_mode',
        'premium_mode',

        'category_id',
        'sub_category_id',
        'user_id', 'author_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function isExpress(): bool
    {
        return $this->express_mode;
    }

    public function activate(): void
    {
        $this->update(['is_active' => true]);
    }


    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePremium($query)
    {
        return $query->where('premium_mode', true);
    }
}
