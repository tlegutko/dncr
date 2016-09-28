<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use JWTAuth;

trait CompanyRelated
{
  public static function bootCompanyRelated()
  {
    static::addGlobalScope(new class implements Scope
    {
      public function apply(Builder $builder, Model $model)
      {
        $builder->where('company_id', JWTAuth::parseToken()->authenticate()->company->id);
      }
    });

    static::creating(function(Model $model)
    {
      $model->company_id = JWTAuth::parseToken()->authenticate()->company->id;
    });
  }
}
