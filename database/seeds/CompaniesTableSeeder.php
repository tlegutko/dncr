<?php

use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('companies')->insert([
                                     'name' => 'Firma 1',
                                     'valid_to' => (new DateTime())->add(new DateInterval('P30D')),
                                   ]);
    DB::table('companies')->insert([
                                     'name' => 'Firma 2',
                                     'valid_to' => (new DateTime())->add(new DateInterval('P10D')),
                                   ]);
  }
}
