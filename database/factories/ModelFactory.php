<?php

use App\Models\Company;
use App\Models\User;

$factory->define(Company::class,
  function(Faker\Generator $faker)
  {
    return [
      'valid_to' => (new DateTime())->add(new DateInterval('P'.random_int(1, 4).'0D')),
    ];
  });

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
      'phone_number' => random_int(111111111, 999999999),
      'password' => bcrypt('admin1'),
    ];
  });
