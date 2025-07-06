<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreelanceGig extends Model
{
    protected $table = 'freelance_gigs';

    protected $fillable = [
        'name',
        'photo',
        'is_active',
        'express_mode',
        'premium_mode',
        'category_id',
        'sub_category_id',
        'user_id',
    ];

    public function freelancer()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
}
