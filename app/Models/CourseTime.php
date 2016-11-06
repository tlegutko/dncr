<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CourseTime extends Model
{
  use ModelCamelCaseConverter;

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

  public function instructors(): BelongsToMany
  {
    return $this->belongsToMany(Instructor::class);
  }
}
