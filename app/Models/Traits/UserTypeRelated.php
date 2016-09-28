<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

trait UserTypeRelated
{
  protected static abstract function type(): string;

  public static function bootUserTypeRelated()
  {
    $type = static::type();
    static::addGlobalScope(new UserTypeScope($type));
    static::creating(function($user) use ($type)
    {
      $user->type = $type;
    });
  }
}

class UserTypeScope implements Scope
{
  private $type;

  function __construct(string $type)
  {
    $this->type = $type;
  }

  public function apply(Builder $builder, Model $model)
  {
    $builder->where('type', $this->type);
  }
}
