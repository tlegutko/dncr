<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInstructorRequest;
use App\Models\Instructor;
use Illuminate\Http\Request;

class InstructorsController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return response()->json(Instructor::all());
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreInstructorRequest $request
   *
   * @return \Illuminate\Http\Response
   */
  public function store(StoreInstructorRequest $request)
  {
    return response()->json(Instructor::create($request->all()));
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
    return response()->json($this->find($id));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\StoreInstructorRequest $request
   * @param  int $id
   *
   * @return \Illuminate\Http\Response
   */
  public function update(StoreInstructorRequest $request, $id)
  {
    return response()->json($this->find($id)->update($request->all()));
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
    return response()->json($this->find($id)->delete());
  }

  private function find($id): Instructor
  {
    return Instructor::findOrFail($id);
  }
}
