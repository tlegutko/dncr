<?php
declare(strict_types=1);

Route::post('api/authorize', 'Auth\AuthController@login');
Route::post('api/logout', 'Auth\AuthController@logout');
Route::get('api/values/{value}', 'ValuesController@test')->middleware('api');
