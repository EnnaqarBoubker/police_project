<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEntityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('entity'));
    }

    public function rules(): array
    {
        $entity = $this->route('entity');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('entities', 'name')
                    ->where(fn ($query) => $query->where('parent_id', $entity->parent_id))
                    ->ignore($entity),
            ],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}
