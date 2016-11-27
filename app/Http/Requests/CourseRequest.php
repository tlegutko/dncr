<?php

namespace App\Http\Requests;

trait CourseRequest
{
  public function authorize()
  {
    return true;
  }

  function courseFieldsRules(): array
  {
    return [
      'course.name' => 'required',
      'course.price' => 'required | numeric | min:0',
      'course.classes_count' => 'required | integer | min:1',
      'course.seats_count' => 'required | integer | min:1',
      'course.times.*.start_date' => 'required | date',
      'course.times.*.start_time' => 'required | date_format:"H:i"',
      'course.times.*.end_time' => 'required | date_format:"H:i"',
      'course.times.*.repeat_weeks_count' => 'required | integer | min:0',
      'course.times.*.location_id' => 'required | integer | exists:locations,id',
      'course.times.*.instructors.*.id' => 'required | integer | exists:users,id',
    ];
  }

  function courseUpdateRules(): array
  {
    return [
      'update_strategy' => [
        'required',
        'regex:/all|single|following/',
      ],
      'course.times.*.id' => 'required | integer',
      'course.times.*.events.*.id' => 'required | integer',
    ];
  }

  function courseFieldsAttributes(): array
  {
    return [
      'course.name' => 'nazwa',
      'course.price' => 'cena',
      'course.classes_count' => 'liczba zajęć',
      'course.seats_count' => 'liczba miejsc',
      'course.times.*.start_date' => 'data',
      'course.times.*.start_time' => 'rozpoczęcie',
      'course.times.*.end_time' => 'zakończenie',
      'course.times.*.repeat_weeks_count' => 'powtarzaj co',
      'course.times.*.location_id' => 'sala',
      'course.times.*.instructors.*.id' => 'prowadzący',
    ];
  }

  function courseUpdateAttributes(): array
  {
    return [
      'update_strategy' => 'strategia edycji',
      'times.*.id' => 'id',
      'times.*.events.*.id' => 'id',
    ];
  }

  function extractCourseData(): array
  {
    $attributes = [
      'name',
      'price',
      'classes_count',
      'description',
      'seats_count',
    ];

    return array_only($this->input(['course']), $attributes) + ['company_id' => 1];
  }

  function extractCourseTimeData(array $courseTimeData): array
  {
    $attributes = [
      'start_date',
      'start_time',
      'end_time',
      'repeat_weeks_count',
      'location_id',
    ];

    return array_only($courseTimeData, $attributes);
  }

  function extractInstructorIds(array $courseTimeData): array
  {
    return array_map(function($instructor)
    {
      return $instructor['id'];
    },
      $courseTimeData['instructors']);
  }
}
