<?php

use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class PaymentTypesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $this->createMoneyType();
    $this->createCardType();
    $this->createBenefitType();
    $this->createOKSystemType();
  }

  private function createMoneyType()
  {
    PaymentType::create([
                          'name' => 'Gotówka',
                          'internal_name' => 'money',
                        ]);
  }

  private function createCardType()
  {
    PaymentType::create([
                          'name' => 'Karta',
                          'internal_name' => 'card',
                        ]);
  }

  private function createBenefitType()
  {
    PaymentType::create([
                          'name' => 'Benefit',
                          'internal_name' => 'benefit',
                        ]);
  }

  private function createOKSystemType()
  {
    PaymentType::create([
                          'name' => 'OK System',
                          'internal_name' => 'ok_system',
                        ]);
  }
}
