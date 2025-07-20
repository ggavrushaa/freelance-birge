<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
        'description',
        'avatar',
        'balance', 'rating',
        'reviews_count', 'orders_count', 'completed_orders_count',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class, 'profile_labels');
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'profile_languages');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'profile_skills');
    }

    public function portfolios()
    {
        return $this->hasMany(Portfolio::class);
    }
}
