<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\MailRequest;
use App\Mail\PlaintextMail;
use App\Models\Attendee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{

  public function __construct()
  {
    $this->middleware('api');
  }

  /**
   * Send the given mail.
   *
   * @param  Request $request
   *
   * @return Response
   */
  public function send(MailRequest $request)
  {
    \Log::info('hello!');
    $attendees = Attendee::query()->where('course_id', '=', $request->id)->get();

    Mail::send(new PlaintextMail($request->title, $request->message),
      function($message) use ($attendees)
      {

        foreach($attendees as $attendee)
        {
          $message->bcc($attendee);
        }
      });
  }
}
