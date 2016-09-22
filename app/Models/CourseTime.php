<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseTime extends Model
{
  use CamelCaseConverter;

  protected $fillable = [
    'course_id',
    'location_id',
    'start_date',
    'start_time',
    'end_time',
    'repeat_weeks_count',
  ];

  public function course()
  {
    return $this->belongsTo(Course::class);
  }

  public function location()
  {
    return $this->hasOne(Location::class, 'id', 'location_id');
  }

  public function events()
  {
    return $this->hasMany(CourseEvent::class);
  }
}
