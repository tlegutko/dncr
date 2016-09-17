<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCoursesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('courses',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('company_id')->unsigned();
        $table->foreign('company_id')->references('id')->on('companies');
        $table->string('name', '50');
        $table->decimal('price');
        $table->integer('classes_count')->unsigned();
        $table->integer('seats_count')->unsigned();
        $table->text('description')->nullable();
        $table->timestamp('created_at')->default(DB::raw('NOW()'));
        $table->timestamp('updated_at')->nullable();
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('courses');
  }
}
