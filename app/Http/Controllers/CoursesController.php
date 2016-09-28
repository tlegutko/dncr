<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Attendee;
use App\Models\Course;

class CoursesController extends Controller
{
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
   * @param  \App\Http\Requests\StoreCourseRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(StoreCourseRequest $request)
  {
    return response()->json(Course::create($request->all()));
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
