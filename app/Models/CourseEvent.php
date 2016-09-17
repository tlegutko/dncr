<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseEvent extends Model
{
  protected $fillable = [
    'course_time_id',
    'date',
  ];

  public function courseTime()
  {
    return $this->belongsTo(CourseTime::class);
  }
}
