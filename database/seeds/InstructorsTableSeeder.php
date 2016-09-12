<?php

use Illuminate\Database\Seeder;

class InstructorsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('instructors')->insert([
                                    'name' => 'Jan', 'surname' => 'Kowalski', 'email' => 'jan@kowalski.com',
                                    'phoneNumber' => '555 555 555',
                                  ])
    ;
    DB::table('instructors')->insert([
                                    'name' => 'Michał', 'surname' => 'Nowak', 'email' => 'michał@nowak.com',
                                    'phoneNumber' => '666 666 666',
                                  ])
    ;
  }
}
