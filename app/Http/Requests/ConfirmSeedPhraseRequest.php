<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmSeedPhraseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'words' => ['required', 'array', 'size:3'],
            'words.*' => ['required', 'string'],
            'indices' => ['required', 'array', 'size:3'],
            'indices.*' => ['required', 'integer', 'min:0', 'max:11'],
        ];
    }
}
