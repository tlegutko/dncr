<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePasswordResetsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('password_resets',
      function(Blueprint $table)
      {
        $table->timestamp('created_at')->useCurrent();
        $table->string('email')->index();
        $table->string('token')->index();
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('password_resets');
  }
}
