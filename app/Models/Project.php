<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use App\Models\Disput;
use App\Models\Review;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'price', 'terms', 'status', 'comment',
        'customer_job_id', 'freelance_gig_id', 'tariff_id',
        'freelancer_id', 'author_id',
        'is_active', 'is_offer',
    ];

    protected $casts = [
        'status' => OrderStatusEnum::class,
    ];

    public function customerJob()
    {
        return $this->belongsTo(CustomerJob::class);
    }

    public function freelanceGig()
    {
        return $this->belongsTo(FreelanceGig::class);
    }

    public function tariff()
    {
        return $this->belongsTo(Tariff::class);
    }

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
    public function disputes()
    {
        return $this->hasMany(Disput::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function activate()
    {
        $this->is_active = true;
        $this->save();
    }

    public function archive()
    {
        $this->is_active = false;
        $this->save();
    }
    public function status($status)
    {
        $this->status = $status;
        $this->save();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    public function scopeOffer($query)
    {
        return $query->where('is_offer', true);
    }

}
