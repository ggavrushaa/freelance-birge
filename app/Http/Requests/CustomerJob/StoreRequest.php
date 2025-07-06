<?php

namespace App\Http\Requests\CustomerJob;

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
            'name' => 'required|string|max:255|unique:customer_jobs,name',
            'description' => 'nullable|string|max:1000',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1048',
            'price' => 'required|numeric|min:0',
            'terms' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'express_mode' => 'boolean',
            'premium_mode' => 'boolean',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'user_id' => 'required|exists:users,id',
            'author_id' => 'nullable|exists:users,id', // Optional, if the job is created by a different user
        ];
    }
}
