<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
            'telegram_id', 'username', 'first_name',
            'last_name', 'avatar', 'bio',

            'balance', 'rating',

            'orders_count', 'completed_orders_count', 'canceled_orders_count',
            'disputes_count', 'win_disputes_count', 'lose_disputes_count',
            'referrals_count',

            'seed_phrase', 'pin_code', 'pin_code_attempts',
            'pin_code_blocked_until', 'email', 'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'telegram_id' => 'string',
            'seed_phrase' => 'encrypted:array',
            'pin_code' => 'encrypted',
            'pin_code_blocked_until' => 'datetime',
            'email_verified_at' => 'datetime',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function hasRole($slug)
    {
        return $this->roles()->where('slug', $slug)->exists();
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'user_skills');
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'user_languages');
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, 'user_badges');
    }

    public function isPinCodeBlocked(): bool
    {
        return $this->pin_code_blocked_until && now()->lessThan($this->pin_code_blocked_until);
    }
}
