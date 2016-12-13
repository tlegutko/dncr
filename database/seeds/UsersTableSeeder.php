<?php

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Company;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
    factory(User::class)->create([
                                   'name' => 'Admin',
                                   'surname' => 'of X company',
                                   'email' => 'admin@dncr.pl',
                                   'company_id' => Company::where('name', 'Firma 1')->first()->id,
                                 ]);
    factory(User::class)->create([
                                   'name' => 'Admin',
                                   'surname' => 'of Y company',
                                   'email' => 'adminY@dncr.pl',
                                   'company_id' => Company::where('name', 'Firma 2')->first()->id,
                                 ]);
  }
}
