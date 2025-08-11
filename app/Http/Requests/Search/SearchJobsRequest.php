<?php

namespace App\Http\Requests\Search;

use Illuminate\Foundation\Http\FormRequest;

class SearchJobsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => 'nullable|string|max:255',
            'completion_time' => 'nullable|in:all,1-2,3-5,7+',
            'express_mode' => 'nullable|in:all,true',
            'premium_mode' => 'nullable|in:all,true',
            'category_id' => 'nullable|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'completion_time.in' => 'Неверное значение для срока выполнения',
            'category_id.exists' => 'Категория не найдена',
            'sub_category_id.exists' => 'Подкатегория не найдена',
            'per_page.integer' => 'Количество элементов должно быть числом',
            'per_page.min' => 'Минимальное количество элементов: 1',
            'per_page.max' => 'Максимальное количество элементов: 100',
        ];
    }
}