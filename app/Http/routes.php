<?php
declare(strict_types=1);

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

Route::get('api/values/{value}', 'ValuesController@test');

Route::get('api/attendees', 'AttendeesController@getAllAttendees');
Route::post('api/attendees', 'AttendeesController@createAttendee');
Route::get('api/attendees/{attendeeId}', 'AttendeesController@getAttendee');
Route::put('api/attendees/{attendeeId}', 'AttendeesController@updateAttendee');
Route::delete('api/attendees/{attendeeId}', 'AttendeesController@deleteAttendee');
