<?php

use App\Models\Company;
use Illuminate\Database\Seeder;

use App\Models\Company;

class CompaniesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Company::create([
                      'name' => 'Firma 1',
                      'valid_to' => (new DateTime())->add(new DateInterval('P30D')),
                    ]);
    Company::create([
                      'name' => 'Firma 2',
                      'valid_to' => (new DateTime())->add(new DateInterval('P10D')),
                    ]);
  }
}
