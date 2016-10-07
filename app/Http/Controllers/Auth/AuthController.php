<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
  use ThrottlesLogins;

  public function login(LoginRequest $request)
  {
    $this->incrementLoginAttempts($request);
    if($this->hasTooManyLoginAttempts($request))
    {
      return $this->sendLockoutResponse($request);
    }

    // grab credentials from the request
    $credentials = $request->only('email', 'password');

    try
    {
      if(!$token = \JWTAuth::attempt($credentials))
      {
        return response()->json(['error' => \Lang::get('auth.failed')], 401);
      }
    }
    catch(JWTException $e)
    {
      return response()->json(['error' => \Lang::get('auth.could_not_create_token')], 500);
    }

    return response()->json(['token' => $token]);
  }
  public function refresh()
  {
    try
    {
      $token = \JWTAuth::refresh();
    }
    catch(JWTException $e)
    {
      return response()->json(['error' => \Lang::get('auth.could_not_create_token')], 500);
    }

    return response()->json(['token' => $token]);
  }

  public function logout()
  {
    try
    {
      $token = \JWTAuth::getToken();
      \JWTAuth::invalidate($token);
    } catch(JWTException $e) {
      // Do nothing - we wanted to invalidate the token
    }

    return response()->json();
  }

  /**
   * Redirect the user after determining they are locked out.
   *
   * @param  \Illuminate\Http\Request $request
   *
   * @return \Illuminate\Http\RedirectResponse
   */
  protected function sendLockoutResponse(Request $request)
  {
    $seconds = $this->limiter()->availableIn(
      $this->throttleKey($request)
    );

    $message = \Lang::get('auth.throttle', ['seconds' => $seconds]);

    return response()->json(['error' => $message])->setStatusCode(429);
  }

  protected function username()
  {
    return 'email';
  }
}
