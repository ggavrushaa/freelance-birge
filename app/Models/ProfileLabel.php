<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileLabel extends Model
{
    protected $table = 'profile_labels';

    protected $fillable = [
        'profile_id',
        'label_id',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function label()
    {
        return $this->belongsTo(Label::class);
    }
}
