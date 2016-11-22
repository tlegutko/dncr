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
      'name' => 'required',
      'price' => 'required | numeric | min:0',
      'classes_count' => 'required | integer | min:1',
      'seats_count' => 'required | integer | min:1',
      'instructor_id' => 'required | integer',
      'times.*.start_date' => 'required | date',
      'times.*.start_time' => 'required | date_format:"H:i"',
      'times.*.end_time' => 'required | date_format:"H:i"',
      'times.*.repeat_weeks_count' => 'required | integer | min:0',
      'times.*.location_id' => 'required | integer | exists:locations,id',
    ];
  }

  function courseUpdateRules(): array
  {
    return [
      'strategy' => [
        'required',
        'regex:all|one|following',
      ],
      'times.*.id' => 'required | integer',
      'times.*.events.*.id' => 'required | integer',
    ];
  }

  function courseFieldsAttributes(): array
  {
    return [
      'name' => 'nazwa',
      'price' => 'cena',
      'classes_count' => 'liczba zajęć',
      'seats_count' => 'liczba miejsc',
      'instructor_id' => 'prowadzący',
      'times.*.start_date' => 'data',
      'times.*.start_time' => 'rozpoczęcie',
      'times.*.end_time' => 'zakończenie',
      'times.*.repeat_weeks_count' => 'powtarzaj co',
      'times.*.location_id' => 'sala',
    ];
  }

  function courseUpdateAttributes(): array
  {
    return [
      'strategy' => 'strategia edycji',
      'times.*.id' => 'id',
      'times.*.events.*.id' => 'id',
    ];
  }

  function extractCourseData() : array
  {
    // TODO remove mock company_id below and inject real one once DNCR-92 is merged
    return $this->only('name',
                       'price',
                       'classes_count',
                       'description',
                       'seats_count') + ['company_id' => 1];
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
}
