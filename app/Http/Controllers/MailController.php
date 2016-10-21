<?php

namespace Http\Controllers;

use App\Mail\PlaintextMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class MailController extends Controller
{
  /**
   * Send the given mail.
   *
   * @param  Request  $request
   * @return Response
   */
  public function send(MailRequest $request)
  {
    $attendees = Attendee::query()->where('course_id', '=', $request->id())->get();
    foreach ($attendees as $attendee)
      Mail::to($attendee.email)->send(new PlaintextMail($request->title(), $request->message()));
  }
}