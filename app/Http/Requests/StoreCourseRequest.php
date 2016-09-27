<?php

namespace App\Http\Requests;

class StoreCourseRequest extends Request
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
      'price' => 'required | numeric',
      'classes_count' => 'required',
      'seats_count' => 'required | numeric',
      'description' => 'required',
      'start_date' => 'required | date',
      'start_time' => 'required | date',
      'end_time' => 'required | date',
      'repeat_weeks_count' => 'required | numeric',
    ];
  }
}
