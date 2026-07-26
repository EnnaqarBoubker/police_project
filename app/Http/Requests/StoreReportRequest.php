<?php

namespace App\Http\Requests;

use App\Support\Countries;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Report::class);
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
            'people' => collect($this->input('people', []))
                ->map(fn ($person) => [...$person, 'count' => $person['count'] ?? 1])
                ->all(),
        ]);
    }

    public function rules(): array
    {
        return [
            'report_date' => ['required', 'date'],
            'report_time' => ['nullable', 'date_format:H:i'],
            'violation_type' => ['nullable', 'string', 'max:255'],
            'entity_id' => ['nullable', 'exists:entities,id'],
            'notes' => ['nullable', 'string'],
            'people' => ['required', 'array', 'min:1'],
            'people.*.full_name' => ['nullable', 'string', 'max:255'],
            'people.*.age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'people.*.gender' => ['nullable', 'in:male,female'],
            'people.*.nationality' => ['nullable', 'string', Rule::in(Countries::codes())],
            'people.*.marital_status' => ['nullable', 'in:single,married,divorced,widowed'],
            'people.*.count' => ['nullable', 'integer', 'min:1'],
        ];
    }
}
