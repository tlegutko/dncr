<?php

namespace App\Models;

use App\Models\Traits\CompanyRelated;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
  use ModelCamelCaseConverter, CompanyRelated;

  protected $fillable = [
    'name',
    'company_id',
  ];

  public function company(): Company
  {
    return $this->belongsTo(Company::class);
  }
}
