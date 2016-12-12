<?php

use App\Models\Payment;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('payments',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('attendee_id')->unsigned();
        $table->foreign('attendee_id')->references('id')->on('attendees')->onDelete('cascade');
        $table->integer('course_id')->unsigned();
        $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        $table->integer('payment_type_id')->unsigned();
        $table->foreign('payment_type_id')->references('id')->on('payment_types')->onDelete('cascade');
        $table->decimal('amount', 8, 2);
        $table->integer('status')->default(Payment::STATUS_NEW);
        $table->string('payment_number')->nullable();
        $table->timestamp('created_at')->default(DB::raw('NOW()'));
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('payments');
  }
}
