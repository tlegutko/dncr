<?php

namespace App\Models;

use App\Models\Traits\CompanyRelated;
use App\Models\Traits\UserTypeRelated;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Instructor extends User
{
  use ModelCamelCaseConverter;
  use UserTypeRelated, CompanyRelated;

  protected static function type(): string
  {
    return User::TYPE_INSTRUCTOR;
  }

  public function courseTimes(): BelongsToMany
  {
    return $this->belongsToMany(CourseTime::class);
  }
}
