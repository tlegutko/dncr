<?php

use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    /** @var stdClass $company */
    $company = DB::table('companies')->where('name', '=', 'Firma 1')->first();

    DB::table('locations')->insert([
                                     'company_id' => $company->id,
                                     'name' => 'Lokacja 1',
                                   ]);
    DB::table('locations')->insert([
                                     'company_id' => $company->id,
                                     'name' => 'Lokacja 2',
                                   ]);
  }
}
