<?php

namespace App\Models;

use App\Models\Traits\CompanyRelated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
  use ModelCamelCaseConverter, CompanyRelated;

  protected $fillable = [
    'company_id',
    'name',
    'price',
    'classes_count',
    'seats_count',
    'description',
  ];

  public function company(): BelongsTo
  {
    return $this->belongsTo(Company::class);
  }

  /**
   * @return CourseTime[]
   */
  public function times(): HasMany
  {
    return $this->hasMany(CourseTime::class);
  }
}
