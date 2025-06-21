<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'telegram_id' => 'required|string|unique:users,telegram_id',
            'username' => 'required|string|unique:users,username',
        ];
    }
}
