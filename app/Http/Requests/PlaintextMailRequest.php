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
      'users' => 'required',
      'title' => 'required',
      'context' => 'required',
    ];
  }

  public function attributes()
  {
    return [
      'users' => 'użytkownicy',
      'title' => 'tytuł',
      'context' => 'treść',
    ];
  }
}
