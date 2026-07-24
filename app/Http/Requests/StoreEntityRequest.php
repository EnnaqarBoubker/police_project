<?php

namespace App\Http\Requests;

use App\Models\Entity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreEntityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Entity::class);
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('entities', 'name')->where(fn ($query) => $query->where('parent_id', $this->input('parent_id'))),
            ],
            'status' => ['required', 'in:active,inactive'],
            'parent_id' => ['nullable', 'exists:entities,id'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $parentId = $this->input('parent_id');

            if ($parentId && Entity::whereKey($parentId)->whereNotNull('parent_id')->exists()) {
                $validator->errors()->add('parent_id', 'لا يمكن إضافة جهة فرعية لجهة فرعية أخرى.');
            }
        });
    }
}
