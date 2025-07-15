<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tariff extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'term',
        'corrections',
        'additional_options',
        'freelance_gig_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'term' => 'integer',
        'corrections' => 'integer',
        'additional_options' => 'array',
    ];

    public function freelanceGig()
    {
        return $this->belongsTo(FreelanceGig::class);
    }

    public function getAdditionalOptionsLabels(): array
    {
        if (!$this->additional_options) {
            return [];
        }

        return collect($this->additional_options)
            ->map(fn($option) => \App\Enums\TariffAdditionalOptionsEnum::from($option)->label())
            ->toArray();
    }
}