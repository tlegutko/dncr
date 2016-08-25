<?php

class AttendeesControllerValidationTest extends TestCase
{
  public function testEmptyRequestValidation()
  {
    $missingParamsExpectedResponse = [
      'Pole name jest wymagane.',
      'Pole surname jest wymagane.',
      'Pole email jest wymagane.',
      'Pole phone number jest wymagane.',
    ];
    $this->validationErrorTest([], $missingParamsExpectedResponse);
  }

  public function testEmailValidation()
  {
    $invalidEmailRequest = [
      'name' => 'Jan',
      'surname' => 'Kowalski',
      'phoneNumber' => '123123888',
      'email' => 'a@g',
    ];
    $invalidEmailResponse = [
      'Podany adres email jest niepoprawny.',
    ];
    $this->validationErrorTest($invalidEmailRequest, $invalidEmailResponse);
  }

  public function testPhoneNumberValidation()
  {
    $invalidPhoneNumberRequest = [
      'name' => 'Jan',
      'surname' => 'Kowalski',
      'phoneNumber' => '12312388', // za krotki
      'email' => 'jan@gmail.com',
    ];
    $invalidPhoneNumberResponse = [
      'Podany numer telefonu jest niepoprawny. Poprawny format to 9 cyfr.',
    ];
    $this->validationErrorTest($invalidPhoneNumberRequest, $invalidPhoneNumberResponse);
  }

  private function validationErrorTest($invalidRequest, $expectedResponse)
  {
    $this->json('POST', '/api/attendees', $invalidRequest);
    $this->assertResponseStatus(422);
    $this->seeJsonEquals($expectedResponse);
  }
}
