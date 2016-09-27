<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
  use ModelCamelCaseConverter;

  protected $fillable = [
    'name',
    'valid_to',
  ];

  protected $dates = [
    'created_at',
    'updated_at',
    'valid_to',
  ];

  /**
   * @return Course[]
   */
  public function courses()
  {
    return $this->hasMany(Course::class);
  }

  /**
   * @return Location[]
   */
  public function locations()
  {
    return $this->hasMany(Location::class);
  }
}
