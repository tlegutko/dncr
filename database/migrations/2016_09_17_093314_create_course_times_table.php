<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCourseTimesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('course_times',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->timestamp('created_at')->useCurrent();
        $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        $table->integer('course_id')->unsigned();
        $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        $table->integer('location_id')->unsigned();
        $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');
        $table->date('start_date');
        $table->time('start_time');
        $table->time('end_time');
        $table->integer('repeat_weeks_count');
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('course_times');
  }
}
