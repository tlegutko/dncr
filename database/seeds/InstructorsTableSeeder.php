<?php

use Illuminate\Database\Seeder;

use App\Models\Company;
use App\Models\User;

class InstructorsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    factory(User::class)->create([
                                   'name' => 'Jan',
                                   'surname' => 'Kowalski',
                                   'email' => 'jan@kowalski.com',
                                   'company_id' => Company::where('name', 'Firma 1')->first()->id,
                                   'type' => User::TYPE_INSTRUCTOR,
                                 ]);
    factory(User::class)->create([
                                   'name' => 'Grzegorz',
                                   'surname' => 'Grzejszczak',
                                   'email' => 'grzegorz@grzejszczak.com',
                                   'company_id' => Company::where('name', 'Firma 1')->first()->id,
                                   'type' => User::TYPE_INSTRUCTOR,
                                 ]);
    factory(User::class)->create([
                                   'name' => 'Michał',
                                   'surname' => 'Nowak',
                                   'email' => 'michał@nowak.com',
                                   'company_id' => Company::where('name', 'Firma 2')->first()->id,
                                   'type' => User::TYPE_INSTRUCTOR,
                                 ]);
  }
}
