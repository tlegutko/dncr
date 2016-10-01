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
      'start_date' => 'required | date',
      'start_time' => 'required | date',
      'end_time' => 'required | date',
      'repeat_weeks_count' => 'required | integer | min:0',
      'location_id' => 'required | integer | exists:locations,id',
      'instructor_id' => 'required | integer',
    ];
  }

  public function attributes()
  {
    return [
      'name' => 'nazwa',
      'price' => 'cena',
      'classes_count' => 'liczba zajęć',
      'seats_count' => 'liczba miejsc',
      'start_date' => 'rozpoczęcie',
      'start_time' => 'rozpoczęcie', // TODO wywalić
      'end_time' => 'zakończenie',
      'repeat_weeks_count' => 'powtarzaj co',
      'location_id' => 'sala',
      'instructor_id' => 'prowadzący',
    ];
  }
}
