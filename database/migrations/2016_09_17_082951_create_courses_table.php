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
        $table->timestamp('created_at')->useCurrent();
        $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        $table->integer('company_id')->unsigned();
        $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        $table->string('name', 50);
        $table->decimal('price');
        $table->integer('classes_count')->unsigned();
        $table->integer('seats_count')->unsigned();
        $table->text('description')->nullable();
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
