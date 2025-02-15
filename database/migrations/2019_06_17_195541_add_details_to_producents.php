<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDetailsToProducents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('producents', function (Blueprint $table) {
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->string('location')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('producents', function (Blueprint $table) {
            $table->dropColumn('phone_number');
            $table->dropColumn('email');
            $table->dropColumn('location');
        });
    }
}
