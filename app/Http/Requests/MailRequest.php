<?php

namespace App\Http\Requests;

class MailRequest extends Request
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
      'title' => 'required',
      'message' => 'required',
    ];
  }

  public function attributes()
  {
    return [
      'title' => 'tytuł',
      'message' => 'treść',
    ];
  }
}
