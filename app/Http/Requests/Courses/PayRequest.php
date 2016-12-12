<?php

namespace App\Http\Requests\Courses;

use App\Http\Requests\RequestCamelCaseConverter;
use Illuminate\Foundation\Http\FormRequest;

class PayRequest extends FormRequest
{
  use RequestCamelCaseConverter;

  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    // TODO: Add checking if user has not paid yet?
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
      'payment_type_id' => 'required | integer | exists:payment_types,id',
      'attendee_id' => 'required | integer | exists:attendees,id',
      'is_manual' => 'required | boolean',
    ];
  }
}
