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
    factory(Company::class)->create(['name' => 'Firma 1']);
    factory(Company::class)->create(['name' => 'Firma 2']);
  }
}
