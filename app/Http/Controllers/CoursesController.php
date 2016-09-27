<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Attendee;
use App\Models\Course;

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
    $course = Course::create($request->only('name', 'price', 'classes_count', 'description', 'seats_count'));
    $courseTime = $course->courseTimes()->create($request->only('start_date',
                                                                'start_time',
                                                                'end_time',
                                                                'repeat_weeks_count'));
    $courseTime->course()->associate($course);
    $courseTime->save();

    $start_date = new DateTime($courseTime->start_date);
    $events = [];
    foreach(range(0, $courseTime->repeat_weeks_count) as $week)
    {
      $date = clone($start_date);
      $event = new CourseEvent(['date' => $date->add(new DateInterval("P{$week}W"))->format(DATE_ISO8601)]);
      $event->courseTime()->associate($courseTime);
      array_push($events, $event);
    }
    $created_events = $courseTime->courseEvents()->saveMany($events);

    $startDiff = $start_date->diff(new DateTime($courseTime->start_time));
    $endDiff = $start_date->diff(new DateTime($courseTime->end_time));

    $events_response = [];
    foreach($created_events as $event) {
      $start_time = new DateTime($event->date);
      $end_time = clone $start_date;
      $event_response = [
        'id' => $event->id,
        'title' => $course->name,
        'start' => $start_time->add($startDiff)->format(DATE_ISO8601),
        'end' => $end_time->add($endDiff)->format(DATE_ISO8601)
      ];
      array_push($events_response, $event_response);
    }

    return response()->json($events_response);
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
