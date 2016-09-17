<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCourseEventsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('course_events',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('course_time_id')->unsigned();
        $table->foreign('course_time_id')->references('id')->on('course_times');
        $table->date('date');
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
    Schema::drop('course_events');
  }
}
