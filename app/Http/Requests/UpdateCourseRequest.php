<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
  use RequestCamelCaseConverter;

    private $createCourseRequest;

    public function __construct() {
      parent::__construct();
      $this->createCourseRequest = new StoreCourseRequest();
    }
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
      return $this->createCourseRequest->rules() +
      [
        'id' => 'required | integer',
        'times.*.id' => 'required | integer',
        'times.*.events.*.id' => 'required | integer',
      ];
    }

    public function attributes()
    {
      return $this->createCourseRequest->attributes() +
      [
        'id' => 'id',
        'times.*.id' => 'id',
        'times.*.events.*.id' => 'id',
      ];
    }
}
