<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Attendee;
use App\Models\Course;
use App\Models\CourseEvent;
use DateInterval;
use DateTime;

class CoursesController extends Controller
{
  /**
   * CoursesController constructor.
   */
  public function __construct()
  {
    $this->middleware('api');
  }

  public function index()
  {
    $courses = Course::with([
                              'times',
                              'times.events',
                            ])->get();

    return response()->json($courses);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  StoreCourseRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(StoreCourseRequest $request)
  {
    $courseData = $request->only('name', 'price', 'classes_count', 'description', 'seats_count') + ['company_id' => 1];
    // TODO remove mock company_id above and inject real one once DNCR-92 is merged
    $course = Course::create($courseData);

    $start_date_from_request = ['start_date' => (new DateTime($request->start_time))->format('Y-m-d')];
    $courseTimeData = $request->only('start_time', 'end_time', 'repeat_weeks_count', 'location_id');
    $courseTime = $course->times()->create($courseTimeData + $start_date_from_request);
    $courseTime->course()->associate($course);
    $courseTime->save();

    $start_date = new DateTime($courseTime->start_date);
    $events = [];
    $step = $courseTime->repeat_weeks_count;
    foreach(range(0, $step * ($course->classes_count - 1), $step) as $week)
    {
      $date = clone($start_date);
      $event = new CourseEvent(['date' => $date->add(new DateInterval("P{$week}W"))]);
      $event->courseTime()->associate($courseTime);
      array_push($events, $event);
    }
    $courseTime->events()->saveMany($events);

    $course->load('times.events');

    return response()->json($course);
  }

  public function show(int $id)
  {
    $course = Course::findOrFail($id);

    return response()->json($course);
  }

  public function attendees(int $id)
  {
    $attendees = Attendee::query()->where('course_id', '=', $id)->get();

    return response()->json($attendees);
  }
}
