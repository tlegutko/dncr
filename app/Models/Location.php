<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Location extends Model
{
  use ModelCamelCaseConverter;

  protected $fillable = [
    'name',
    'company_id',
  ];

  public function company(): BelongsTo
  {
    return $this->belongsTo(Company::class);
  }
}
