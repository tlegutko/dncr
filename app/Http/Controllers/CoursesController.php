<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Attendee;
use App\Models\Course;
use DateInterval;
use DateTime;
use DB;

class CoursesController extends Controller
{
  public function index()
  {
    $courses = Course::with('times.events')->get();

    return response()->json($courses);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  StoreCourseRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(StoreCourseRequest $request) // TODO StoreCourseRequest
  {
    $course = DB::transaction(function() use ($request)
    {
      // TODO remove mock company_id below and inject real one once DNCR-92 is merged
      $courseData = $request->only('name',
                                   'price',
                                   'classes_count',
                                   'description',
                                   'seats_count') + ['company_id' => 1];
      $course = Course::create($courseData);

      foreach($request->input()['times'] as $courseTimeData)
      {
        $courseTime = $course->times()->create($courseTimeData);
        $startDate = new DateTime($courseTime->start_date);
        $step = $courseTime->repeat_weeks_count;

        foreach(range(0, $step * ($course->classes_count - 1), $step) as $week)
        {
          $startDateCopy = clone($startDate);
          $eventDate = ['date' => $startDateCopy->add(new DateInterval("P{$week}W"))];
          $courseTime->events()->create($eventDate);
        }
      }

      return $course;
    });

    $course->load('times.events');

    return response()->json($course);
  }

  public function show(int $id)
  {
    $course = Course::with('times.events')->findOrFail($id);

    return response()->json($course);
  }
}
