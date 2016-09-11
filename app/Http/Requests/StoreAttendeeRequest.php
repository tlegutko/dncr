<?php

namespace App\Http\Requests;

class StoreAttendeeRequest extends Request
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
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
      'name' => 'required',
      'surname' => 'required',
      'email' => 'required | email | unique:attendee',
      'phoneNumber' => 'required | digits:9 | unique:attendee',
    ];
  }

  public function attributes()
  {
    return [
      'name' => 'imię',
      'surname' => 'nazwisko',
      'email' => 'adres e-mail',
      'phoneNumber' => 'numer telefonu',
    ];
  }
}
