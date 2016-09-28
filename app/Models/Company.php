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

  /**
   * @return User[]
   */
  public function users()
  {
    return $this->hasMany(User::class);
  }

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
