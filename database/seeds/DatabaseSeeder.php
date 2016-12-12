<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $this->call(UsersTableSeeder::class);
    $this->call(PaymentTypesTableSeeder::class);
    $this->call(CompaniesTableSeeder::class);
    $this->call(LocationsTableSeeder::class);
    $this->call(InstructorsTableSeeder::class);
    $this->call(CoursesTableSeeder::class);
    $this->call(AttendeesTableSeeder::class);
    $this->call(CompanyPaymentTypesTableSeeder::class);
  }
}
