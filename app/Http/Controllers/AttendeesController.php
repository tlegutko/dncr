<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Attendee;
use App\Http\Requests\StoreAttendeeRequest;

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
   * @param  StoreAttendeeRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(StoreAttendeeRequest $request)
  {
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
   * @param  StoreAttendeeRequest $request
   * @param  int $id
   *
   * @return \Illuminate\Http\Response
   */
  public function update(StoreAttendeeRequest $request, $id)
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
