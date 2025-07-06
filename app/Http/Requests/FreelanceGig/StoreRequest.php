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
        ];
    }
}
