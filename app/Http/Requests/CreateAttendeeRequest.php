<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Contracts\Validation\Validator;

class CreateAttendeeRequest extends Request
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
             'email' => 'required | unique:attendees,email',
             'phoneNumber' => 'required | unique:attendees,phoneNumber',
    ];
  }

}
