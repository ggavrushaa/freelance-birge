<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
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
        'status',
    ];

    protected $casts = [
        'status' => OrderStatusEnum::class,
    ];

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function tariffs()
    {
        return $this->hasMany(Tariff::class);
    }

    public function activate()
    {
        $this->is_active = true;
        $this->save();
    }
}
