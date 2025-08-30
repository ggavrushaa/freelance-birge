<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table = 'favorites';

    protected $fillable = [
        'user_id',
        'favorable_type',
        'favorable_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function favorable()
    {
        return $this->morphTo();
    }

    public function customerJob()
    {
        return $this->belongsTo(CustomerJob::class, 'favorable_id');
    }

    public function freelanceGig()
    {
        return $this->belongsTo(FreelanceGig::class, 'favorable_id');
    }
}
