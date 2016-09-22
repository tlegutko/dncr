<?php

namespace App\Http\Requests;

use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

trait CamelCaseConverter
{
  public function input($key = null, $default = null)
  {
    // Convert keys from camelCase to snake_case
    $input = parent::input($key, $default);

    $converter = new CamelCaseToSnakeCaseNameConverter();
    $results = [];
    foreach($input as $key => $value)
    {
      $results[$converter->normalize($key)] = $value;
    }

    return $results;
  }
}
