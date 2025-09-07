<?php

namespace App\Http\Requests\Project;

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
            'price' => 'nullable|numeric|min:0',
            'terms' => 'nullable|integer|min:0',
            'customer_job_id' => 'nullable|exists:customer_jobs,id',
            'freelance_gig_id' => 'nullable|exists:freelance_gigs,id',
            'tariff_id' => 'nullable|exists:tariffs,id',
            'freelancer_id' => 'nullable|exists:users,id',
            'author_id' => 'required|exists:users,id',
            'is_active' => 'nullable|boolean',
            'is_offer' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'price.required' => 'Price is required',
            'terms.required' => 'Terms are required',
            'customer_job_id.required' => 'Customer job id is required',
            'freelance_gig_id.required' => 'Freelance gig id is required',
            'tariff_id.required' => 'Tariff id is required',
            'freelancer_id.required' => 'Freelancer id is required',
            'author_id.required' => 'Author id is required',
            'is_active.required' => 'Is active is required',
            'is_offer.required' => 'Is offer is required',
        ];
    }
}   