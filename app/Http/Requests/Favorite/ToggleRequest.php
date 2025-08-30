<?php

namespace App\Http\Requests\Favorite;

use Illuminate\Foundation\Http\FormRequest;

class ToggleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'favorable_type' => 'required|string|in:customer_job,freelance_gig,tariff',
            'favorable_id' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'favorable_type.required' => 'The favorable type is required.',
            'favorable_type.in' => 'The favorable type must be either customer_job, freelance_gig, or tariff.',
            'favorable_id.required' => 'The favorable ID is required.',
            'favorable_id.integer' => 'The favorable ID must be an integer.',
            'favorable_id.min' => 'The favorable ID must be at least 1.',
        ];
    }
}
