<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Attendee;
use App\Http\Requests\CreateAttendeeRequest;

class AttendeesController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return response()->json(Attendee::all());
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  CreateAttendeeRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(CreateAttendeeRequest $request)
  {
    //    $requestHasAllRequiredFields = $request->has(['name', 'surname', 'email', 'phoneNumber']);
    //    if (!$requestHasAllRequiredFields) {
    //      return response()->json(['message' => 'Brakujące wymagane pola'])->setStatusCode(400);
    //    }
    $attendeeAlreadyExists = Attendee::where('email', $request->get('email'))
                                     ->orWhere('phoneNumber', $request->get('phoneNumber'))
                                     ->exists();
    if($attendeeAlreadyExists)
    {
      return response()->json(['message' => 'Email lub numer telefonu już wykorzystany.'])->setStatusCode(400);
    }

    return response()->json(Attendee::create($request->all()));
  }

  /**
   * Display the specified resource.
   *
   * @param  int $id
   *
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $attendee = Attendee::findOrFail($id);

    return $attendee;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  CreateAttendeeRequest $request
   * @param  int $id
   *
   * @return \Illuminate\Http\Response
   */
  public function update(CreateAttendeeRequest $request, $id)
  {
    $attendee = Attendee::findOrFail($id);

    return $attendee->update($request->all());
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int $id
   *
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $attendee = Attendee::findOrFail($id);

    return $attendee->delete();
  }
}
