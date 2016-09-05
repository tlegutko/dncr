<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response;

abstract class Request extends FormRequest
{
  /**
   * {@inheritdoc}
   */
  protected function formatErrors(Validator $validator)
  {
    /** @var \Illuminate\Support\MessageBag $errors */
    $errors = $validator->errors();

    return $errors->messages();
  }

  /*
   * Get the validator instance for the request.
   *
   * @return \Illuminate\Validation\Validator
   */
  protected function getValidatorInstance()
  {
    $factory = $this->container->make('Illuminate\Validation\Factory');

    if(method_exists($this, 'validator'))
    {
      return $this->container->call([$this, 'validator'], compact('factory'));
    }

    return $factory->make($this->json()->all(),
                          $this->container->call([$this, 'rules']),
                          $this->messages(),
                          $this->attributes());
  }

  public function forbiddenResponse()
  {
    return new Response(json_encode(['error' => \Lang::get('auth.forbidden')]), 403);
  }
}
