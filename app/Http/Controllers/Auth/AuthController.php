<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Foundation\Auth\ThrottlesLogins;
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
      // attempt to verify the credentials and create a token for the user
      if(!$token = \JWTAuth::attempt($credentials))
      {
        return response()->json(['error' => \Lang::get('auth.failed')], 401);
      }
    }
    catch(JWTException $e)
    {
      // something went wrong whilst attempting to encode the token
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
  protected function sendLockoutResponse(\Illuminate\Http\Request $request)
  {
    $seconds = $this->secondsRemainingOnLockout($request);

    return response()->json(['error' => $this->getLockoutErrorMessage($seconds)])->setStatusCode(429);
  }

  protected function loginUsername()
  {
    return 'email';
  }
}
