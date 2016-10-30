<?php

use App\Models\Company;
use App\Models\CompanyPaymentType;
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
    $company1Id = Company::where('name', 'Firma 1')->first()->id;
    $company2Id = Company::where('name', 'Firma 2')->first()->id;
    $moneyId = PaymentType::where('internal_name', 'money')->first()->id;
    $cardId = PaymentType::where('internal_name', 'card')->first()->id;
    $benefitId = PaymentType::where('internal_name', 'benefit')->first()->id;
    $okSystemId = PaymentType::where('internal_name', 'ok_system')->first()->id;

    $this->create($company1Id, $moneyId);
    $this->create($company1Id, $benefitId, 20.00);
    $this->create($company1Id, $okSystemId, 10.00);
    $this->create($company2Id, $moneyId);
    $this->create($company2Id, $cardId);
    $this->create($company2Id, $okSystemId, 15.00);
  }

  private function create($companyId, $typeId, $deposit = null)
  {
    CompanyPaymentType::create([
                                 'company_id' => $companyId,
                                 'payment_type_id' => $typeId,
                                 'deposit' => $deposit,
                               ]);
  }
}
