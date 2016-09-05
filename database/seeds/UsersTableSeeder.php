<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('users')->insert(['name' => 'Admin', 'email' => 'admin@dncr.eu', 'password' => bcrypt('admin1')]);
  }
}
