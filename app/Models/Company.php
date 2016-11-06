<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
  public function courses(): HasMany
  {
    return $this->hasMany(Course::class);
  }

  /**
   * @return Location[]
   */
  public function locations(): HasMany
  {
    return $this->hasMany(Location::class);
  }

  public function paymentTypes(): BelongsToMany
  {
    return $this->belongsToMany(PaymentType::class)->withPivot('deposit');
  }
}
