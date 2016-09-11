<?php

class AttendeesControllerTest extends TestCase
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

  //  public function testBasicExample()
  //  {
  //    $this->get('/api/values/10', ['X-XSRF-TOKEN' => $this->token])->seeJsonEquals(['test' => 10]);
  //  }

  public function testRequiresToken()
  {
    $this->post('/api/attendee', [
      'name' => 'Jan',
      'surname' => 'Kowalski',
      'phoneNumber' => '123123888',
      'email' => 'a@g.com',
    ]);
    $this->seeJson(['error' => 'token_not_provided']);
  }

//  public function testEmptyRequestValidation()
//  {
//    $missingParamsExpectedResponse = [
//      'Pole name jest wymagane.',
//      'Pole surname jest wymagane.',
//      'Pole email jest wymagane.',
//      'Pole phone number jest wymagane.',
//    ];
//    $this->validationErrorTest([], $missingParamsExpectedResponse);
//  }
//
//  public function testEmailValidation()
//  {
//    $invalidEmailRequest = [
//      'name' => 'Jan',
//      'surname' => 'Kowalski',
//      'phoneNumber' => '123123888',
//      'email' => 'a@g',
//    ];
//    $invalidEmailResponse = [
//      'Podany adres email jest niepoprawny.',
//    ];
//    $this->mockValidator($invalidEmailResponse);
//    $this->validationErrorTest($invalidEmailRequest, $invalidEmailResponse);
//  }
//
//  public function testPhoneNumberValidation()
//  {
//    $invalidPhoneNumberRequest = [
//      'name' => 'Jan',
//      'surname' => 'Kowalski',
//      'phoneNumber' => '12312388',
//      // za krotki
//      'email' => 'jan@gmail.com',
//    ];
//    $invalidPhoneNumberResponse = [
//      'Podany numer telefonu jest niepoprawny. Poprawny format to 9 cyfr.',
//    ];
//    $this->mockValidator($invalidPhoneNumberResponse);
//    $this->validationErrorTest($invalidPhoneNumberRequest, $invalidPhoneNumberResponse);
//  }
//
//  private function validationErrorTest($invalidRequest, $expectedResponse)
//  {
//    $this->json('POST', '/api/attendee', $invalidRequest);
//    $this->assertResponseStatus(422);
//    $this->seeJsonEquals($expectedResponse);
//  }
//
//  private function mockValidator($expectedResponse) {
//    $messageBag = Mockery::mock('Illuminate\Support\MessageBag');
//    $messageBag->shouldReceive('all')->once()->andReturn($expectedResponse);
//
//    $validator = Mockery::mock('Illuminate\Validation\Validator');
//    $validator->shouldReceive('passes')->once()->andReturn(false);
//    $validator->shouldReceive('errors')->once()->andReturn($messageBag);
//
//    Validator::shouldReceive('make')->once()->andReturn($validator);
//  }
}
