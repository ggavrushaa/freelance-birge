<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifySeedPhraseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'words' => ['required', 'array', 'size:12'],
            'words.*' => ['required', 'string'],
            'indices' => ['required', 'array', 'size:12'],
            'indices.*' => ['required', 'integer', 'min:1', 'max:12'],
            'telegram_id' => ['required', 'string'],
        ];
    }
}
