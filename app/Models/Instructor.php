<?php

namespace App\Models;

use App\Models\Traits\CompanyRelated;
use App\Models\Traits\UserTypeRelated;

class Instructor extends User
{
  use ModelCamelCaseConverter;
  use UserTypeRelated, CompanyRelated;

  protected static function type(): string
  {
    return User::TYPE_INSTRUCTOR;
  }
}
