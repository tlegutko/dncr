<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Routing\Middleware\ThrottleRequests as BaseThrottleRequests;

class ThrottleRequests extends BaseThrottleRequests
{
  /**
   * Create a 'too many attempts' response.
   *
   * @param  string  $key
   * @param  int  $maxAttempts
   * @return \Illuminate\Http\Response
   */
  protected function buildResponse($key, $maxAttempts)
  {
    $response = new Response(json_encode(['error' => \Lang::get('auth.too_many_attempts')]), 429);

    $retryAfter = $this->limiter->availableIn($key);

    return $this->addHeaders(
      $response, $maxAttempts,
      $this->calculateRemainingAttempts($key, $maxAttempts, $retryAfter),
      $retryAfter
    );
  }
}

