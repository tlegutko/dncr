<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseTimesInstructorsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('course_time_instructor',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('course_time_id')->unsigned()->nullable();
        $table->foreign('course_time_id')->references('id')->on('course_times')->onDelete('cascade');

        $table->integer('instructor_id')->unsigned()->nullable();
        $table->foreign('instructor_id')->references('id')->on('users')->onDelete('cascade');
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('course_time_instructor');
  }
}