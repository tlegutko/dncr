<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
  protected $fillable = [
    'name',
    'company_id',
  ];

  public function company(): Company
  {
    return $this->belongsTo(Company::class);
  }
}
