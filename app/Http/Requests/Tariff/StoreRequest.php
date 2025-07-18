<?php

namespace App\Http\Requests\Tariff;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'term' => 'required|integer|min:1',
            'corrections' => 'required|integer|min:0',
            'additional_options' => 'nullable|array',
            'additional_options.*' => 'string|in:' . implode(',', array_column(\App\Enums\TariffAdditionalOptionsEnum::cases(), 'value')),
            'freelance_gig_id' => 'nullable|exists:freelance_gigs,id',
        ];
    }
}