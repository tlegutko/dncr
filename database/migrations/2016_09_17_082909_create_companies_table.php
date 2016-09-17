<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCompaniesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('companies',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->string('name', 50);
        $table->timestamp('valid_to');
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
    Schema::drop('companies');
  }
}
