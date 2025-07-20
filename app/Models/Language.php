<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $table = 'languages';

    protected $fillable = [
        'name',
    ];

    public function profiles()
    {
        return $this->belongsToMany(Profile::class, 'profile_languages');
    }
}
