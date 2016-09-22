<?php

namespace App\Models;

use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

trait CamelCaseConverter
{
  public function fill(array $attributes)
  {
    // Convert keys from camelCase to snake_case
    $converter = new CamelCaseToSnakeCaseNameConverter();
    $results = [];
    foreach($attributes as $key => $value)
    {
      $results[$converter->normalize($key)] = $value;
    }

    /** @noinspection PhpUndefinedClassInspection */
    return parent::fill($results);
  }

  public function toArray()
  {
    // Convert keys from snake_case to camelCase
    $converter = new CamelCaseToSnakeCaseNameConverter();
    /** @noinspection PhpUndefinedClassInspection */
    $values = parent::toArray();
    $result = [];
    foreach($values as $key => $value)
    {
      $result[$converter->denormalize($key)] = $value;
    }

    return $result;
  }
}
