<?php

class ExampleTest extends TestCase
{
  // TODO: Properly setup tests so we can check real API responses
//  private $token;
//
//  public function setUp()
//  {
//    parent::setUp();
//    $request = $this->json('POST',
//                           '/api/authorize',
//                           ['email' => 'admin@dncr.pl', 'password' => 'admin1'],
//                           ['Content-Type' => 'application/json']);
//    $data = json_decode($request->response->content());
//    $this->token = $data->token;
//  }

  public function testRestrictedEndpoint()
  {
    $this->get('/api/values/10')->seeJsonEquals(['error' => 'token_not_provided']);
  }

//  public function testBasicExample()
//  {
//    $this->get('/api/values/10', ['X-XSRF-TOKEN' => $this->token])->seeJsonEquals(['test' => 10]);
//  }
}
