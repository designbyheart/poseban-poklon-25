<?php

use Illuminate\Support\Facades\Schema;
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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_role_id')->unsigned()->nullable();
            $table->foreign('user_role_id')->references('id')->on('user_roles')->onDelete('cascade'); //foreing key on user role
            $table->string('name');
            $table->string('email')->unique();
            $table->string('username')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->date('birthdate')->nullable();
            $table->string('facebook_id')->nullable();
            $table->string('city')->nullable();
            $table->string('avatar')->nullable();
            $table->text('description')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('pinterest_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('status')->nullable()->default(1);
            $table->timestamp('last_login_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
