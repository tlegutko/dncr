<?php

namespace App\Http\Requests;

class StoreAttendeeRequest extends Request
{
  use RequestCamelCaseConverter;

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
      'course_id' => 'required',
      'name' => 'required',
      'surname' => 'required',
      'email' => 'required | email | unique:attendees',
      'phone_number' => 'required | digits:9 | unique:attendees',
    ];
  }

  public function attributes()
  {
    return [
      'email' => 'adres e-mail',
      'name' => 'imię',
      'phone_number' => 'numer telefonu',
      'surname' => 'nazwisko',
    ];
  }
}
