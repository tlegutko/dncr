<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->string('name');
        $table->string('surname');
        $table->string('password');
        $table->string('email')->unique();
        $table->string('phone_number')->unique();
        $table->string('type');
        $table->integer('company_id')->unsigned()->index();
        $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        $table->rememberToken();
        $table->timestamps();
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('users');
  }
}
