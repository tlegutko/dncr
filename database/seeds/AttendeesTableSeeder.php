<?php

use Illuminate\Database\Seeder;

class AttendeesTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('attendees')->insert([
                                     'name' => 'Bartosz',
                                     'surname' => 'Rakoczy',
                                     'email' => 'brakoczy@dncr.eu',
                                     'phoneNumber' => '123456789',
                                   ]);
    DB::table('attendees')->insert([
                                     'name' => 'Tomasz',
                                     'surname' => 'Legutko',
                                     'email' => 'tlegutko@dncr.eu',
                                     'phoneNumber' => '876543219',
                                   ]);
    DB::table('attendees')->insert([
                                     'name' => 'Marek',
                                     'surname' => 'Łakomy',
                                     'email' => 'mlakomy@dncr.eu',
                                     'phoneNumber' => '123487659',
                                   ]);
    DB::table('attendees')->insert([
                                     'name' => 'Szymon',
                                     'surname' => 'Łabuz',
                                     'email' => 'slabuz@dncr.eu',
                                     'phoneNumber' => '432187659',
                                   ]);
    DB::table('attendees')->insert([
                                     'name' => 'Amadeusz',
                                     'surname' => 'Starzykiewicz',
                                     'email' => 'astarzykiewicz@dncr
                                   .eu',
                                     'phoneNumber' => '432156789',
                                   ]);
    DB::table('attendees')->insert([
                                     'name' => 'Andrzej',
                                     'surname' => 'Kaczmarczyk',
                                     'email' => 'akaczmarczyk@dncr.eu',
                                     'phoneNumber' => '876512349',
                                   ]);
  }
}
