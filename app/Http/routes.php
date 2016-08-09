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

Route::get('api/users', 'UsersController@getAllUsers');
Route::post('api/users', 'UsersController@createUser');
Route::get('api/users/{userId}', 'UsersController@getUser');
Route::put('api/users/{userId}', 'UsersController@updateUser');
Route::delete('api/users/{userId}', 'UsersController@deleteUser');
