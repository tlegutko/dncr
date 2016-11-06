<?php

use App\Models\Company;
use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class CompanyPaymentTypesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $money = PaymentType::query()->where('internal_name', 'money')->first();
    $card = PaymentType::query()->where('internal_name', 'card')->first();
    $benefit = PaymentType::query()->where('internal_name', 'benefit')->first();
    $okSystem = PaymentType::query()->where('internal_name', 'ok_system')->first();

    /** @var Company $company */
    $company = Company::query()->where('name', 'Firma 1')->first();
    $company->paymentTypes()->attach($money);
    $company->paymentTypes()->attach($benefit, ['deposit' => 20.00]);
    $company->paymentTypes()->attach($okSystem, ['deposit' => 10.00]);

    /** @var Company $company */
    $company = Company::query()->where('name', 'Firma 2')->first();
    $company->paymentTypes()->attach($money);
    $company->paymentTypes()->attach($card);
    $company->paymentTypes()->attach($okSystem, ['deposit' => 15.00]);
  }
}
