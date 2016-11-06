<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use App\Http\Requests\Courses\PayRequest;
use App\Models\Course;
use App\Models\Payment;

class PaymentController extends Controller
{
  /**
   * Store new payment request.
   *
   * @param int $id Course ID.
   * @param PayRequest $request The request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(int $id, PayRequest $request)
  {
    /** @var Course $course */
    $course = Course::findOrFail($id);

    $values = $request->only(['payment_type_id', 'attendee_id']);
    $values['course_id'] = $id;
    $values['amount'] = $course->getAttribute('price');
    if ($request->get('is_manual', false))
    {
      $values['status'] = Payment::STATUS_PAID;
    }

    Payment::create($values);

    return response('', 201);
  }
}
