<?php

namespace App\Http\Requests;

class CreateCourseRequest extends Request
{
  use RequestCamelCaseConverter, CourseRequest;

  public function rules()
  {
    return $this->courseFieldsRules();
  }

  public function attributes()
  {
    return $this->courseFieldsAttributes();
  }
}
