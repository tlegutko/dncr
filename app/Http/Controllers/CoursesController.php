<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Attendee;
use App\Models\Course;
use DateInterval;
use DateTime;
use DB;
use Illuminate\Http\Request;

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
    // TODO remove mock company_id below and inject real one once DNCR-92 is merged
    $courseData = $request->only('name', 'price', 'classes_count', 'description', 'seats_count') + ['company_id' => 1];
    $courseTimeData = $request->input()['times'][0];

    $course = DB::transaction(function() use ($courseData, $courseTimeData)
    {
      $course = Course::create($courseData);
      $courseTime = $course->times()->create($courseTimeData);

      $startDate = new DateTime($courseTime->start_date);
      $step = $courseTime->repeat_weeks_count;
      foreach(range(0, $step * ($course->classes_count - 1), $step) as $week)
      {
        $startDateCopy = clone($startDate);
        $eventDate = ['date' => $startDateCopy->add(new DateInterval("P{$week}W"))];
        $courseTime->events()->create($eventDate);
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

  public function attendees(int $id)
  {
    $attendees = Attendee::query()->where('course_id', '=', $id)->get();

    return response()->json($attendees);
  }
}
