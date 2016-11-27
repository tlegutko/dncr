<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Attendee;
use App\Models\Course;
use App\Models\CourseEvent;
use App\Models\CourseTime;
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
    $courses = Course::with('times.events', 'times.instructors')->get();

    return response()->json($courses);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  CreateCourseRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function create(CreateCourseRequest $request)
  {
    $course = DB::transaction(function() use ($request)
    {

      $course = Course::create($request->extractCourseData());

      foreach($request->input('course.times') as $courseTimeData)
      {
        $courseTime = $course->times()->create($this->extractCourseTimeData($courseTimeData)); // TODO move to request or smthn
        $courseTime->instructors()->sync($this->extractInstructorIds($courseTimeData));
        $courseTime = $course->times()->create($request->extractCourseTimeData($courseTimeData));
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

    $course->load('times.events', 'times.instructors');

    return response()->json($course);
  }

  public function updateAll(UpdateCourseRequest $request)
  {
    $course = DB::transaction(function() use ($request)
    {
      $course = Course::findOrFail($request->id);
      $course->update($this->extractCourseData($request));

      foreach($request->input()['times'] as $courseTimeData)
      {
        $courseTime = CourseTime::findOrFail($courseTimeData['id']);
        $courseTime->instructors()->sync($this->extractInstructorIds($courseTimeData));
        $courseTime->update($this->extractCourseTimeData($courseTimeData));

        foreach($courseTimeData['events'] as $courseEventData)
        {
          $courseEvent = CourseEvent::findOrFail($courseEventData['id']);
          $courseEvent->update(array_only($courseEventData, ['date']));
        }
      }

      return $course;
    });

    $course->load('times.events', 'times.instructors');

    return response()->json($course);
  }

  public function update(UpdateCourseRequest $request, int $id)
  {
    if($request->input('update_strategy') === 'all')
    {
      return $this->updateAll($request, $id);
    }
    else
    {
      return response()->json(['error' => 'Unsupported update strategy'], 400);
    }
  }

  public function updateAll(UpdateCourseRequest $request, int $id)
  {
    $course = DB::transaction(function() use ($request, $id)
    {
      $course = Course::findOrFail($id);
      $course->update($request->extractCourseData());

      foreach($request->input('course.times') as $courseTimeData)
      {
        $courseTime = CourseTime::findOrFail($courseTimeData['id']);
        $courseTime->update($request->extractCourseTimeData($courseTimeData));

        foreach($courseTimeData['events'] as $courseEventData)
        {
          $courseEvent = CourseEvent::findOrFail($courseEventData['id']);
          $courseEvent->update(array_only($courseEventData, ['date']));
        }
      }

      return $course;
    });

    $course->load('times.events');

    return response()->json($course);
  }

  public function show(int $id)
  {
    $course = Course::with('times.events', 'times.instructors')->findOrFail($id);

    return response()->json($course);
  }

  public function attendees(int $id)
  {
    $attendees = Attendee::query()->where('course_id', '=', $id)->get();

    return response()->json($attendees);
  }
  private function extractCourseData(Request $request) : array
  {
    return $request->only('name',
                          'price',
                          'classes_count',
                          'description',
                          'seats_count');
  }

  private function extractCourseTimeData(array $courseTimeData): array
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

  private function extractInstructorIds(array $courseTimeData): array
  {
    return array_map(function($instructor)
    {
      return $instructor['id'];
    },
      $courseTimeData['instructors']);
  }
}
