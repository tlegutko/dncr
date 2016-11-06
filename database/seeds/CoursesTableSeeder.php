<?php

use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
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
    /** @var stdClass $location */
    $location = DB::table('locations')->where('name', '=', 'Lokacja 1')->first();
    /** @var stdClass $instructor */
    $instructor = DB::table('users')->where('email', '=', 'jan@kowalski.com')->first();

    $this->addFirstCourse($company, $location, $instructor);
  }

  private function addFirstCourse(stdClass $company, stdClass $location, stdClass $instructor)
  {
    $courseId = DB::table('courses')->insertGetId([
                                                    'company_id' => $company->id,
                                                    'name' => 'Kurs 1',
                                                    'price' => 49.99,
                                                    'classes_count' => 1,
                                                    'seats_count' => 10,
                                                  ]);
    $date = new DateTime();
    $timeId = DB::table('course_times')->insertGetId([
                                                       'course_id' => $courseId,
                                                       'location_id' => $location->id,
                                                       'start_date' => $date,
                                                       'start_time' => '11:00',
                                                       'end_time' => '12:30',
                                                       'repeat_weeks_count' => 2,
                                                     ]);
    DB::table('course_events')->insert([
                                         'course_time_id' => $timeId,
                                         'date' => $date,
                                       ]);
    DB::table('course_events')->insert([
                                         'course_time_id' => $timeId,
                                         'date' => $date->add(new DateInterval('P7D')),
                                       ]);
    DB::table('course_time_instructor')->insert([
                                                    'course_time_id' => $timeId,
                                                    'instructor_id' => $instructor->id,
                                                  ]);
    $date = (new DateTime())->add(new DateInterval('P2D'));
    $timeId = DB::table('course_times')->insertGetId([
                                                       'course_id' => $courseId,
                                                       'location_id' => $location->id,
                                                       'start_date' => $date,
                                                       'start_time' => '10:00',
                                                       'end_time' => '11:30',
                                                       'repeat_weeks_count' => 2,
                                                     ]);
    DB::table('course_events')->insert([
                                         'course_time_id' => $timeId,
                                         'date' => $date,
                                       ]);
    DB::table('course_events')->insert([
                                         'course_time_id' => $timeId,
                                         'date' => $date->add(new DateInterval('P7D')),
                                       ]);
    DB::table('course_time_instructor')->insert([
                                                    'course_time_id' => $timeId,
                                                    'instructor_id' => $instructor->id,
                                                  ]);
  }
}
