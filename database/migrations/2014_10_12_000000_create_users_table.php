<?php

use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users',
      function(Blueprint $table)
      {
        $table->increments('id');
        $table->timestamp('created_at')->useCurrent();
        $table->timestamp('updated_at')->nullable()->default(DB::raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        $table->string('name');
        $table->string('surname');
        $table->string('password');
        $table->string('email')->unique();
        $table->string('phone_number')->unique();
        $table->string('type')->default(User::TYPE_DEFAULT);
        $table->integer('company_id')->unsigned()->index();
        $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        $table->rememberToken();
      });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('users');
  }
}
