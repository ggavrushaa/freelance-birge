<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disput extends Model
{
    protected $table = 'disputs';

    protected $fillable = [
        'reason', 'description', 'status', 'file_url',
        'project_id', 'user_id',
    ];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
