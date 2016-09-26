<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

trait CamelCaseConverter
{
  public function input($key = null, $default = null)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::input($key, $default);
    $converter = new CamelCaseToSnakeCaseNameConverter();

    $results = [];
    foreach($source as $key => $value)
    {
      $results[$converter->normalize($key)] = $value;
    }

    return $results;
  }

  public function json($key = null, $default = null)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::json($key, $default);
    $converter = new CamelCaseToSnakeCaseNameConverter();

    $results = [];
    foreach($source as $key => $value)
    {
      $results[$converter->normalize($key)] = $value;
    }

    return new ParameterBag($results);
  }

  protected function formatErrors(Validator $validator)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::formatErrors($validator);
    $converter = new CamelCaseToSnakeCaseNameConverter();

    $results = [];
    foreach($source as $key => $value)
    {
      $results[$converter->denormalize($key)] = $value;
    }

    return $results;
  }
}
