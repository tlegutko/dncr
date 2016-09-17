<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLocationsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('locations',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('company_id')->unsigned();
        $table->foreign('company_id')->references('id')->on('companies');
        $table->string('name', 50);
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
    Schema::drop('locations');
  }
}
