<?php

namespace App\Models;

use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

trait ModelCamelCaseConverter
{
  public function fill(array $attributes)
  {
    // Convert keys from camelCase to snake_case
    $results = $this->convertRecursive($attributes, $this->convertingFunction('normalize'));

    /** @noinspection PhpUndefinedClassInspection */
    return parent::fill($results);
  }

  public function toArray()
  {
    // Convert keys from snake_case to camelCase
    /** @noinspection PhpUndefinedClassInspection */
    return $this->convertRecursive(parent::toArray(), $this->convertingFunction('denormalize'));
  }

  private function convertingFunction(string $functionName) : callable
  {
    return [
      new CamelCaseToSnakeCaseNameConverter(),
      $functionName,
    ];
  }

  private function convertRecursive(array $arr, callable $convertingFun): array
  {
    return collect($arr)->mapWithKeys(function($item, $key) use ($convertingFun)
    {
      $newItem = is_array($item) ? $this->convertRecursive($item, $convertingFun) : $item;

      return [$convertingFun($key) => $newItem];
    })->toArray();
  }
}
