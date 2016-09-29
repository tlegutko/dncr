<?php
declare(strict_types = 1);

Route::post('api/authorize', 'Auth\AuthController@login');
Route::post('api/logout', 'Auth\AuthController@logout');

// Attendees
Route::get('api/attendees', 'AttendeesController@index');
Route::post('api/attendees', 'AttendeesController@store');
Route::get('api/attendees/{id}', 'AttendeesController@show');
Route::put('api/attendees/{id}', 'AttendeesController@update');
Route::delete('api/attendees/{id}', 'AttendeesController@destroy');

// Instructors
Route::get('api/instructors', 'InstructorsController@index');
Route::post('api/instructors', 'InstructorsController@store');
Route::get('api/instructors/{id}', 'InstructorsController@show');
Route::put('api/instructors/{id}', 'InstructorsController@update');
Route::delete('api/instructors/{id}', 'InstructorsController@destroy');

// Courses
Route::get('api/courses', 'CoursesController@index');
Route::post('api/courses', 'CoursesController@store');
Route::get('api/courses/{id}', 'CoursesController@show');
Route::get('api/courses/{id}/attendees', 'CoursesController@attendees');
