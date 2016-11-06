<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;

trait RequestCamelCaseConverter
{
  public function input($key = null, $default = null)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::input($key, $default);

    return $this->normalize($source);
  }

  public function json($key = null, $default = null)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::json($key, $default)->all();

    return new ParameterBag($this->normalize($source));
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

      $newKey = is_int($key) ? $key : $normalizer->normalize($key);
      $result[$newKey] = $value;
    }

    return $result;
  }

  protected function formatErrors(Validator $validator)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::formatErrors($validator);
    $result = [];

    $normalizer = new CamelCaseToSnakeCaseNameConverter();
    foreach ($source as $key => $value)
    {
      $path = implode('.', array_map(function($part) use ($normalizer) {
        return $normalizer->denormalize($part);
      }, explode('.', $key)));

      array_set($result, $path, $value);
    }

    return $result;
  }
}
