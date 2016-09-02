<?php
declare(strict_types = 1);

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::resource('api/attendees', 'AttendeesController', ['only' => [
  'index', 'store', 'show', 'update', 'destroy'
  ]]);
Route::resource('api/instructors', 'InstructorsController', [
  'only' => [
    'index', 'store', 'show', 'update', 'destroy',
  ],
]);

