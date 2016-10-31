<?php

use Illuminate\Database\Seeder;

class AttendeesTableSeeder extends Seeder
{
  public function run()
  {
    $this->addFirstCourseAttendees();
  }

  public function addFirstCourseAttendees()
  {
    /** @var stdClass $company */
    $course = DB::table('courses')->where('name', '=', 'Kurs 1')->first();

    DB::table('attendees')->insert([
                                     'course_id' => $course->id,
                                     'name' => 'Bartosz',
                                     'surname' => 'Rakoczy',
                                     'email' => 'bartosz.rakoczy@gmail.com',
                                     'phone_number' => '123456789',
                                   ]);
    DB::table('attendees')->insert([
                                     'course_id' => $course->id,
                                     'name' => 'Tomasz',
                                     'surname' => 'Legutko',
                                     'email' => 'tlegutko@dncr.eu',
                                     'phone_number' => '876543219',
                                   ]);
    DB::table('attendees')->insert([
                                     'course_id' => $course->id,
                                     'name' => 'Marek',
                                     'surname' => 'Łakomy',
                                     'email' => 'mlakomy@dncr.eu',
                                     'phone_number' => '123487659',
                                   ]);
    DB::table('attendees')->insert([
                                     'course_id' => $course->id,
                                     'name' => 'Szymon',
                                     'surname' => 'Łabuz',
                                     'email' => 'slabuz@dncr.eu',
                                     'phone_number' => '432187659',
                                   ]);
    DB::table('attendees')->insert([
                                     'course_id' => $course->id,
                                     'name' => 'Amadeusz',
                                     'surname' => 'Starzykiewicz',
                                     'email' => 'astarzykiewicz@dncr.eu',
                                     'phone_number' => '432156789',
                                   ]);
    DB::table('attendees')->insert([
                                     'course_id' => $course->id,
                                     'name' => 'Andrzej',
                                     'surname' => 'Kaczmarczyk',
                                     'email' => 'akaczmarczyk@dncr.eu',
                                     'phone_number' => '876512349',
                                   ]);
  }
}
