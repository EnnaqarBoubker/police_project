<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Report::class);
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'report_date' => ['required', 'date'],
            'age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'gender' => ['nullable', 'in:male,female'],
            'marital_status' => ['nullable', 'in:single,married,divorced,widowed'],
            'center_id' => ['required', 'exists:centers,id'],
            'entity_id' => ['nullable', 'exists:entities,id'],
            'violation_type' => ['required', 'string', 'max:255'],
            'count' => ['nullable', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
            'entities' => ['nullable', 'array'],
            'entities.*.entity_name' => ['required_with:entities', 'string', 'max:255'],
            'entities.*.entity_type' => ['nullable', 'string', 'max:255'],
        ];
    }
}
