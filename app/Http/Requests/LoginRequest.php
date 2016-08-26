<?php

namespace App\Http\Requests;

class LoginRequest extends Request
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    // TODO: Add checking for user status
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'email' => 'required|email|max:255',
      'password' => 'required|min:6',
    ];
  }
}
