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
        $table->timestamp('created_at')->useCurrent();
        $table->timestamp('updated_at')->nullable()->default(DB::raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        $table->integer('company_id')->unsigned();
        $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        $table->string('name', 50);
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
