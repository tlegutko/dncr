<?php

namespace App\Models;

use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

trait ModelCamelCaseConverter
{
  public function fill(array $attributes)
  {
    /** @noinspection PhpUndefinedClassInspection */
    return parent::fill($this->normalize($attributes));
  }

  private function normalize(array $source)
  {
    $normalizer = new CamelCaseToSnakeCaseNameConverter();
    $result = [];

    foreach ($source as $key => $value)
    {
      if (is_array($value))
      {
        $value = $this->normalize($value);
      }

      $result[$normalizer->normalize($key)] = $value;
    }

    return $result;
  }

  public function toArray()
  {
    // Convert keys from snake_case to camelCase
    /** @noinspection PhpUndefinedClassInspection */
    return $this->denormalize(parent::toArray());
  }

  private function denormalize(array $source)
  {
    $normalizer = new CamelCaseToSnakeCaseNameConverter();
    $result = [];

    foreach ($source as $key => $value)
    {
      $result[$normalizer->denormalize($key)] = $value;
    }

    return $result;
  }
}
