<?php
declare(strict_types=1);

namespace App\Http\Controllers;

class ValuesController extends Controller
{
  public function test(int $value)
  {
    return response()->json(['test' => $value]);
  }
}
