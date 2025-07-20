<?php

namespace App\Http\Requests\FreelanceGig;

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
            'name' => 'required|string|max:40',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1048',
            'premium_mode' => 'boolean',
            'express_mode' => 'boolean',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'user_id' => 'required|exists:users,id',
            'tariffs' => 'nullable|array',
            'tariffs.*.name' => 'required|string|max:40',
            'tariffs.*.description' => 'required|string|max:120',
            'tariffs.*.price' => 'required|numeric|min:0',
            'tariffs.*.term' => 'required|integer|min:1',
            'tariffs.*.corrections' => 'required|integer|min:0',
            'tariffs.*.freelance_gig_id' => 'nullable',
            'tariffs.*.additional_options' => 'nullable|array',
            'tariffs.*.additional_options.*' => 'string|in:' . implode(',', array_column(\App\Enums\TariffAdditionalOptionsEnum::cases(), 'value')),
        ];
    }
}
