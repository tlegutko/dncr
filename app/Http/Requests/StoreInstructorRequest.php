<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class StoreInstructorRequest extends Request
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
    return [ // [tlegutko] see dncr/app/resources/lang/pl/validation for translations
             'name' => 'required',
             'surname' => 'required',
             'email' => 'required | email | unique:attendees',
             'phone_number' => 'required | digits:9 | unique:attendees',
    ];
  }

  public function attributes()
  {
    return [
      'name' => 'imię',
      'surname' => 'nazwisko',
      'email' => 'adres e-mail',
      'phone_number' => 'numer telefonu',
    ];
  }
}