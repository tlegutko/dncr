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

    return $this->convertRecursive($source, $this->convertingFunction('normalize'));
  }

  public function json($key = null, $default = null)
  {
    $fun = $this->convertingFunction('normalize');
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::json($key, $default)->all();

    return new ParameterBag($this->convertRecursive($source, $this->convertingFunction('normalize')));
  }

  protected function formatErrors(Validator $validator)
  {
    /** @noinspection PhpUndefinedClassInspection */
    $source = parent::formatErrors($validator);

    $nested = $this->nestErrors($source);

    return $this->convertRecursive($nested, $this->convertingFunction('denormalize'));
  }

  private function nestErrors(array $arr) : array
  {
    $nested = [];
    foreach($arr as $key => $value)
    {
      $dotPos = strpos($key, '.');
      if($dotPos !== false)
      {
        $prefix = substr($key, 0, $dotPos);
        $withoutPrefix = substr($key, $dotPos + 1);
        $secondDotPos = strpos($withoutPrefix, '.');
        if($secondDotPos !== false)
        {
          $index = substr($withoutPrefix, 0, $secondDotPos);
          $suffix = substr($withoutPrefix, $secondDotPos + 1);

          $alreadyFilled = isset($nested[$prefix][$index]) ? $nested[$prefix][$index] : [];
          $nested[$prefix][$index] = array_merge($alreadyFilled, $this->nestErrors([$suffix => $value]));
        }
        else
        {
          $nested[$key] = $value;
        }
      }
      else
      {
        $nested[$key] = $value;
      }
    }

    return $nested;
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
      $newKey = is_numeric($key) ? $key : $convertingFun($key);
      $newItem = is_array($item) ? $this->convertRecursive($item, $convertingFun) : $item;

      return [$newKey => $newItem];
    })->toArray();
  }
}
