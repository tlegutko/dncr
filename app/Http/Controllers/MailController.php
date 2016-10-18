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
  public function send(PlaintextMailRequest $request)
  {
    Mail::to($request->users())->send(new PlaintextMail($request->title(), $request->context()));
  }
}