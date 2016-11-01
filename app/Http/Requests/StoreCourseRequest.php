<?php

namespace App\Http\Requests;

class StoreCourseRequest extends Request
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
      'name' => 'required',
      'price' => 'required | numeric | min:0',
      'classes_count' => 'required | integer | min:1',
      'seats_count' => 'required | integer | min:1',
      'instructor_id' => 'required | integer',
      'times.*.start_date' => 'required | date',
      'times.*.start_time' => 'required | date_format:"H:i"',
      'times.*.end_time' => 'required | date_format:"H:i"',
      'times.*.repeat_weeks_count' => 'required | integer | min:0',
      'times.*.location_id' => 'required | integer | exists:locations,id',
    ];
  }

  public function attributes()
  {
    return [
      'name' => 'nazwa',
      'price' => 'cena',
      'classes_count' => 'liczba zajęć',
      'classesCount' => 'liczba zajęć 2',
      'seats_count' => 'liczba miejsc',
      'instructor_id' => 'prowadzący',
      'times.*.start_date' => 'data',
      'times.*.start_time' => 'rozpoczęcie',
      'times.*.end_time' => 'zakończenie',
      'times.*.repeat_weeks_count' => 'powtarzaj co',
      'times.*.location_id' => 'sala',
    ];
  }
}
