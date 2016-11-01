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
    $attendeeMails = Attendee::query()->where('course_id', '=', $request->course_id)->select('email')->get();

    Mail::send(new PlaintextMail($request->title, $request->message, $attendeeMails));
  }
}
