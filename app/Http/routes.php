<?php
declare(strict_types=1);

Route::resource('api/attendee', 'AttendeesController', ['only' => [
  'index', 'store', 'show', 'update', 'destroy'
  ]]);
Route::post('api/authorize', 'Auth\AuthController@login');
Route::post('api/logout', 'Auth\AuthController@logout');
