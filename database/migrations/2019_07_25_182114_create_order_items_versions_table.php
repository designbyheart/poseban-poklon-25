<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderItemsVersionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items_versions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order_item_id')->unsigned()->nullable();
            $table->foreign('order_item_id')->references('id')->on('order_items')->onDelete('cascade');
            $table->integer('version_id')->unsigned()->nullable();
            $table->foreign('version_id')->references('id')->on('versions')->onDelete('cascade');
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
        Schema::dropIfExists('order_items_versions');
    }
}
