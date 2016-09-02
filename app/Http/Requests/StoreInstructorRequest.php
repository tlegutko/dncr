<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class StoreInstructorRequest extends Request
{
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
             'phoneNumber' => 'required | digits:9 | unique:attendees',
    ];
  }

}