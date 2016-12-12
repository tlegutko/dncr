<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyPaymentTypeTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('company_payment_type',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('company_id')->unsigned();
        $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        $table->integer('payment_type_id')->unsigned();
        $table->foreign('payment_type_id')->references('id')->on('payment_types')->onDelete('cascade');
        $table->decimal('deposit', 6, 2)->nullable();
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('company_payment_type');
  }
}
