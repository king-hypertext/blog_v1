<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class storeUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'firstname' => 'required',
            'lastname' => 'required',
            // 'profile_picture' => 'required',
            'phone_number' => 'required|numeric|max_digits:13|unique:users,phone_number',
            // 'status' => 'required',
            // 'bio' => 'required',
            'password' => 'required',
        ];
    }
    public function attributes(): array
    {
        return [
            'email' => 'email address',
        ];
    }
}
