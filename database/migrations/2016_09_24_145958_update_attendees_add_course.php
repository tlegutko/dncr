<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class UpdateAttendeesAddCourse extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('attendees',
      function(Blueprint $table)
      {
        $table->renameColumn('phoneNumber', 'phone_number');
        $table->integer('course_id')->unsigned();
        $table->foreign('course_id')->references('id')->on('courses');
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('attendees',
      function(Blueprint $table)
      {
        $table->renameColumn('phone_number', 'phoneNumber');
        $table->dropColumn('course_id');
      });
  }
}
