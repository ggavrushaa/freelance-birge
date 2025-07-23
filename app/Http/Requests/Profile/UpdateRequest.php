<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1024',
            'balance' => 'nullable|numeric|min:0',
            'rating' => 'nullable|numeric|min:0',
            'reviews_count' => 'nullable|numeric|min:0',
            'orders_count' => 'nullable|numeric|min:0',
            'completed_orders_count' => 'nullable|numeric|min:0',
            'languages' => 'nullable|array',
            'skills' => 'nullable|array',
            'languages.*' => 'exists:languages,id',
            'skills.*' => 'exists:skills,id',
        ];
    }
}
