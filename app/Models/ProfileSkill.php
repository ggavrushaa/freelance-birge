<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileSkill extends Model
{
    protected $table = 'profile_skills';

    protected $fillable = [
        'profile_id',
        'skill_id',
    ];
    
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }
}
