<?php

Route::post('authorize', 'Auth\AuthController@login');
Route::post('logout', 'Auth\AuthController@logout')->middleware('auth');
Route::post('refresh-token', 'Auth\AuthController@refresh')->middleware('auth');

Route::group(['middleware' => 'auth'], function(){
  // Attendees
  Route::get('attendees', 'AttendeesController@index');
  Route::post('attendees', 'AttendeesController@store');
  Route::get('attendees/{id}', 'AttendeesController@show');
  Route::put('attendees/{id}', 'AttendeesController@update');
  Route::delete('attendees/{id}', 'AttendeesController@destroy');

  // Instructors
  Route::get('instructors', 'InstructorsController@index');
  Route::post('instructors', 'InstructorsController@store');
  Route::get('instructors/{id}', 'InstructorsController@show');
  Route::put('instructors/{id}', 'InstructorsController@update');
  Route::delete('instructors/{id}', 'InstructorsController@destroy');

  // Courses
  Route::get('courses', 'CoursesController@index');
  Route::post('courses', 'CoursesController@store');
  Route::get('courses/{id}', 'CoursesController@show');
  Route::get('courses/{id}/attendees', 'Courses\AttendeesController@index');

  // Locations
  Route::get('locations', 'LocationsController@index');

  // Payment methods
  Route::get('payment-methods', 'PaymentMethodsController@index');

  // Payment
  Route::post('courses/{id}/pay', 'Courses\PaymentController@store');
});
