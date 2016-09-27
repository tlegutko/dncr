<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendee extends Model
{
  use ModelCamelCaseConverter;

  protected $fillable = [
    'name',
    'surname',
    'email',
    'phone_number',
    'course_id',
  ];
}
