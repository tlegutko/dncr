<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
  use ModelCamelCaseConverter;

  protected $fillable = [
    'company_id',
    'name',
    'price',
    'classes_count',
    'seats_count',
    'description',
  ];

  public function company()
  {
    return $this->belongsTo(Company::class);
  }

  /**
   * @return CourseTime[]
   */
  public function times()
  {
    return $this->hasMany(CourseTime::class);
  }
}
