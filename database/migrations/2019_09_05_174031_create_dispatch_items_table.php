<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDispatchItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dispatch_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('dispatch_id')->unsigned();
            $table->foreign('dispatch_id')->references('id')->on('dispatches')->onDelete('cascade');
            $table->integer('order_item_id')->unsigned();
            $table->foreign('order_item_id')->references('id')->on('order_items');
            $table->bigInteger('stock_item_id')->unsigned();
            $table->foreign('stock_item_id')->references('id')->on('stock_items')->onDelete('cascade');
            $table->integer('quantity')->default(1)->unsigned();
            $table->text('comment')->nullable();
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
        Schema::dropIfExists('dispatch_items');
    }
}
