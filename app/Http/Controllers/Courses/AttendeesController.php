<?php

namespace App\Http\Controllers\Courses;

use App\Models\Attendee;

use App\Http\Controllers\Controller;

class AttendeesController extends Controller
{
  public function index(int $id)
  {
    $attendees = Attendee::query()->where('course_id', '=', $id)->get();

    return response()->json($attendees);
  }
}
