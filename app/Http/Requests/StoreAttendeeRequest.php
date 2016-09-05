<?php

namespace App\Http\Requests;

class StoreAttendeeRequest extends Request
{
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
      'email' => 'required | email | unique:attendees',
      'phoneNumber' => 'required | digits:9 | unique:attendees',
    ];
  }

}
