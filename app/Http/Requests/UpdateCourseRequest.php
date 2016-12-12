<?php

namespace App\Http\Requests;

class UpdateCourseRequest extends CreateCourseRequest
{
  public function rules()
  {
    return parent::rules() + [
        'update_strategy' => [
          'required',
          'regex:/all|single|following/',
        ],
        'course.times.*.id' => 'required | integer',
        'course.times.*.events.*.id' => 'required | integer',
      ];
  }

  public function attributes()
  {
    return parent::attributes() + [
        'update_strategy' => 'strategia edycji',
        'times.*.id' => 'id',
        'times.*.events.*.id' => 'id',
      ];
  }
}
