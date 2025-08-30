<?php

namespace App\Http\Requests\Disput;
    
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
            'reason' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'file_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5048',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
        ];
    }
    public function messages(): array
    {
        return [
            'reason.required' => 'Reason is required',
            'description.required' => 'Description is required',
            'file_url.image' => 'File URL must be an image',
            'file_url.mimes' => 'File URL must be an image',
            'file_url.max' => 'File URL must be less than 5048KB',
            'project_id.required' => 'Project ID is required',
            'user_id.required' => 'User ID is required',
        ];
    }
}