<?php

namespace App\Models;

class Instructor extends User
{
  protected $fillable = [
    'name',
    'surname',
    'email',
    'phoneNumber',
  ];
}
