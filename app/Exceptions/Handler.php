<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
  /**
   * A list of the exception types that should not be reported.
   *
   * @var array
   */
  protected $dontReport = [
    AuthorizationException::class,
    HttpException::class,
    ModelNotFoundException::class,
    ValidationException::class,
  ];

  /**
   * Report or log an exception.
   *
   * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
   *
   * @param  \Exception $e
   *
   * @return void
   */
  public function report(Exception $e)
  {
    parent::report($e);
  }

  /**
   * Render an exception into an HTTP response.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Exception $e
   *
   * @return \Illuminate\Http\Response
   */
  public function render($request, Exception $e)
  {
    if($request->isXmlHttpRequest() || $request->isJson())
    {
      if($e instanceof HttpResponseException || $e instanceof ValidationException)
      {
        return $e->getResponse();
      }
      elseif($e instanceof ModelNotFoundException)
      {
        return response()->json($e->getMessage(), 404);
      }
      elseif($e instanceof NotFoundHttpException)
      {
        return response()->json(['error' => \Lang::get('app.not_found')], 404);
      }

      $error = class_basename($e).' in '.basename($e->getFile()).' line '.$e->getLine().': '.$e->getMessage();

      return response()->json(['exception' => $error], 500);
    }

    return parent::render($request, $e);
  }

  /**
   * Convert an authentication exception into an unauthenticated response.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Illuminate\Auth\AuthenticationException $exception
   *
   * @return \Illuminate\Http\Response
   */
  protected function unauthenticated($request, AuthenticationException $exception)
  {
    return response()->json(['error' => \Lang::get('auth.forbidden')], 401);
  }
}
