<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseEvent extends Model
{
  use ModelCamelCaseConverter;

  protected $fillable = [
    'course_time_id',
    'date',
  ];

  public function courseTime(): BelongsTo
  {
    return $this->belongsTo(CourseTime::class);
  }
}
