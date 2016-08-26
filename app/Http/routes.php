<?php
declare(strict_types=1);

Route::post('api/authorize', 'Auth\AuthController@login')->middleware(['api']);
Route::get('api/values/{value}', 'ValuesController@test')->middleware(['web', 'authorize']);
