<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

  public function course(): BelongsTo
  {
    return $this->belongsTo(Course::class);
  }

  public function location(): HasOne
  {
    return $this->hasOne(Location::class, 'id', 'location_id');
  }

  public function events(): HasMany
  {
    return $this->hasMany(CourseEvent::class);
  }
}
