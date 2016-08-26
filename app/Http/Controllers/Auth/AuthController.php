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
}
