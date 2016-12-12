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

class CoursesController extends Controller
{
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
        $courseTime = $course->times()->create($request->extractCourseTimeData($courseTimeData));
        $courseTime->instructors()->sync($request->extractInstructorIds($courseTimeData));
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
        $courseTime = $this->createOrUpdateCourseTime($courseTimeData, $request, $course);
        $datesArray = [];
        if(array_key_exists('events', $courseTimeData)) // update existing
        {
          foreach($courseTimeData['events'] as $courseEventData)
          {
            $courseEvent = CourseEvent::findOrFail($courseEventData['id']);
            $courseEvent->update(array_only($courseEventData, ['date']));
            $datesArray[$courseEventData['date']] = $courseEventData['id'];
          }
        }
        $startDate = new DateTime($courseTime->start_date);
        $step = $courseTime->repeat_weeks_count;
        $addedEventsIds = [];
        foreach(range(0, $step * ($course->classes_count - 1), $step) as $week) // add new events
        {
          $startDateCopy = clone($startDate);
          $dateString = $startDateCopy->add(new DateInterval("P{$week}W"))->format('Y-m-d');
          if(!array_key_exists($dateString, $datesArray))
          {
            $eventId = $courseTime->events()->create(['date' => $dateString])->id;
          }
          else
          {
            $eventId = $datesArray[$dateString];
          }
          array_push($addedEventsIds, $eventId);
        }
        // delete other events
        CourseEvent::query()->where('course_time_id', $courseTime->id)->whereNotIn('id', $addedEventsIds)->delete();
      }

      return $course;
    });

    $course->load('times.events', 'times.instructors');

    return response()->json($course);
  }

  private function createOrUpdateCourseTime(array $courseTimeData, UpdateCourseRequest $request, Course $course): CourseTime
  {
    if(array_key_exists('id', $courseTimeData))
    {
      $courseTime = CourseTime::findOrFail($courseTimeData['id']);
      $courseTime->update($request->extractCourseTimeData($courseTimeData));
    }
    else
    {
      $courseTime = $course->times()->create($request->extractCourseTimeData($courseTimeData));
    }
    $courseTime->instructors()->sync($request->extractInstructorIds($courseTimeData));

    return $courseTime;
  }

  public function show(int $id)
  {
    $course = Course::with('times.events', 'times.instructors')->findOrFail($id);

    return response()->json($course);
  }

}
