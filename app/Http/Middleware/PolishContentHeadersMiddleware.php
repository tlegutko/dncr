<?php

namespace App\Http\Middleware;

use Closure;

class PolishContentHeadersMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   *
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    $response = $next($request);
    $response->setCharset("utf-8");
    $response->setEncodingOptions(JSON_UNESCAPED_UNICODE);

    return $response;
  }
}
