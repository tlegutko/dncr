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
    $company1 = DB::table('companies')->where('name', 'Firma 1')->first();
    $company2 = DB::table('companies')->where('name', 'Firma 2')->first();

    DB::table('locations')->insert([
                                     'company_id' => $company1->id,
                                     'name' => 'Lokacja 1',
                                   ]);
    DB::table('locations')->insert([
                                     'company_id' => $company1->id,
                                     'name' => 'Lokacja 2',
                                   ]);
    DB::table('locations')->insert([
                                     'company_id' => $company2->id,
                                     'name' => 'Lokacja Y',
                                   ]);
  }
}
