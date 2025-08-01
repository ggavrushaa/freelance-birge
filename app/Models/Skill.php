<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $table = 'skills';

    protected $fillable = [
        'name',
    ];

    public function profiles()
    {
        return $this->belongsToMany(Profile::class, 'profile_skills');
    }
}
