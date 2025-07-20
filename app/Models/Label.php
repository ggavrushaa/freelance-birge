<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    protected $table = 'labels';

    protected $fillable = [
        'name',
    ];

    public function profiles()
    {
        return $this->belongsToMany(Profile::class, 'profile_labels');
    }
}
