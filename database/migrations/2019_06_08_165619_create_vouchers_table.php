<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVouchersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order_item_id')->unsigned()->nullable();
            $table->foreign('order_item_id')->references('id')->on('order_items')->onDelete('cascade');
            $table->date('end_date')->nullable();
            $table->string('voucher_code')->nullable();
            $table->string('activation_code')->nullable();
            $table->string('type')->nullable();
            $table->boolean('activated')->default(0);
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
        Schema::dropIfExists('vouchers');
    }
}
