<?php

use Illuminate\Database\Seeder;

class AttendeesTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('attendees')->insert(['name' => 'Bartosz', 'surname' => 'Rakoczy', 'email' => 'brakoczy@dncr.eu',
                                    'phoneNumber' => '123456789'],
                                   ['name' => 'Tomasz', 'surname' => 'Legutko', 'email' => 'tlegutko@dncr.eu',
                                    'phoneNumber' => '876543219'],
                                   ['name' => 'Marek', 'surname' => 'Łakomy', 'email' => 'mlakomy@dncr.eu',
                                    'phoneNumber' => '123487659'],
                                   ['name' => 'Szymon', 'surname' => 'Łabuz', 'email' => 'slabuz@dncr.eu',
                                    'phoneNumber' => '432187659'],
                                   ['name' => 'Amadeusz', 'surname' => 'Starzykiewicz', 'email' => 'astarzykiewicz@dncr
                                   .eu', 'phoneNumber' => '432156789'],
                                   ['name' => 'Andrzej', 'surname' => 'Kaczmarczyk', 'email' => 'akaczmarczyk@dncr.eu',
                                    'phoneNumber' => '876512349']);
  }
}
