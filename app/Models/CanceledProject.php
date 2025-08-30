<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CanceledProject extends Model
{
    protected $table = 'canceled_projects';

    protected $fillable = [
        'reason', 'description', 'file_url',
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
