<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;

class SwitchRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role_slug' => 'required|string|in:customer,freelancer',
        ];
    }

    public function messages(): array
    {
        return [
            'role_slug.required' => 'Role slug is required.',
            'role_slug.string' => 'Role slug must be a string.',
            'role_slug.in' => 'Role must be either customer or freelancer.',
        ];
    }
}