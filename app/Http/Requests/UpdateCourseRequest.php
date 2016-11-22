<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
  use RequestCamelCaseConverter, CourseRequest;

  public function rules()
  {
    return $this->courseFieldsRules() + $this->courseUpdateRules();
  }

  public function attributes()
  {
    return $this->courseFieldsAttributes() + $this->courseUpdateAttributes();
  }
}
