<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('payment_method_id')->unsigned()->nullable();
            $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');
            $table->integer('shipping_method_id')->unsigned()->nullable();
            $table->foreign('shipping_method_id')->references('id')->on('shipping_methods')->onDelete('cascade');
            $table->integer('order_status_id')->unsigned()->nullable();
            $table->foreign('order_status_id')->references('id')->on('order_statuses')->onDelete('cascade');
            $table->decimal('subtotal')->nullable();
            $table->decimal('total')->unsigned()->nullable();
            $table->decimal('discount')->nullable();
            $table->decimal('giftcard_discount')->nullable();
            $table->decimal('coupon_discount')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_surname')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('address_one')->nullable();
            $table->string('address_two')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->integer('zip_code')->nullable();
            $table->text('comment')->nullable();
            $table->string('coupon_code')->nullable();
            $table->string('giftcard_code')->nullable();
            $table->json('user_agreements')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
