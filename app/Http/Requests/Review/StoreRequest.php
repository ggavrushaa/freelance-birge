<?php

namespace App\Http\Requests\Review;

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
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
            'reviewer_id' => 'required|exists:users,id',
            'rating' => 'required|numeric|min:0|max:5',
            'comment' => 'nullable|string|max:1000',
        ];
    }
    public function messages(): array
    {
        return [
            'project_id.required' => 'Project id is required',
            'user_id.required' => 'User id is required',
            'reviewer_id.required' => 'Reviewer id is required',
            'rating.required' => 'Rating is required',
            'rating.numeric' => 'Rating must be a number',
            'rating.min' => 'Rating must be at least 0',
            'rating.max' => 'Rating must be at most 5',
            'comment.string' => 'Comment must be a string',
            'comment.max' => 'Comment must be at most 1000 characters',
        ];
    }
}