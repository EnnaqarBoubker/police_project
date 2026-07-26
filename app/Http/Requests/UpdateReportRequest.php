<?php

namespace App\Http\Requests;

use App\Support\Countries;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('report'));
    }

    /**
     * Every field is optional by design, but a couple of NOT NULL columns
     * (report_date, count) still need a real value — default them here
     * rather than forcing the admin to fill them in.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'report_date' => $this->input('report_date') ?: now()->toDateString(),
            'count' => $this->input('count') ?: 1,
        ]);
    }

    public function rules(): array
    {
        return [
            'full_name' => ['nullable', 'string', 'max:255'],
            'report_date' => ['required', 'date'],
            'report_time' => ['nullable', 'date_format:H:i'],
            'age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'gender' => ['nullable', 'in:male,female'],
            'nationality' => ['nullable', 'string', Rule::in(Countries::codes())],
            'marital_status' => ['nullable', 'in:single,married,divorced,widowed'],
            'entity_id' => ['nullable', 'exists:entities,id'],
            'violation_type' => ['nullable', 'string', 'max:255'],
            'count' => ['nullable', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
