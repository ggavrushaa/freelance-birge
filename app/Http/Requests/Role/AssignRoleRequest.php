<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;

class AssignRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'role_slug' => 'required|string|exists:roles,slug',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'User ID is required.',
            'user_id.exists' => 'User not found.',
            'role_slug.required' => 'Role slug is required.',
            'role_slug.string' => 'Role slug must be a string.',
            'role_slug.exists' => 'Role not found.',
        ];
    }
}