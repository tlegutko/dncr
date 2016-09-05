<?php
declare(strict_types = 1);

Route::post('api/authorize', 'Auth\AuthController@login');
Route::post('api/logout', 'Auth\AuthController@logout');
Route::resource('api/attendees', 'AttendeesController', ['only' => [
  'index', 'store', 'show', 'update', 'destroy'
]]);
Route::resource('api/instructors', 'InstructorsController', ['only' => [
  'index', 'store', 'show', 'update', 'destroy',
]]);
