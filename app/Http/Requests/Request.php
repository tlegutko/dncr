<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

abstract class Request extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true; // TODO [tlegutko] Change this once authorization is implemented
  }

  /**
   * {@inheritdoc}
   */
  protected function formatErrors(Validator $validator)
  {
    return $validator->errors()->all();
  }
}
