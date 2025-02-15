<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('producent_id')->unsigned()->nullable();
            $table->foreign('producent_id')->references('id')->on('producents')->onDelete('cascade');
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price')->unsigned()->nullable();
            $table->decimal('company_price')->unsigned()->nullable();
            $table->string('currency')->nullable();
            $table->string('shop_url')->nullable();
            $table->string('slug')->nullable();
            $table->integer('rating')->default(0);
            $table->integer('view_count')->unsigned()->nullable();
            $table->integer('wishlist_count')->unsigned()->nullable();
            $table->integer('like_count')->unsigned()->nullable();
            $table->integer('comments_count')->unsigned()->nullable();
            $table->boolean('status')->nullable()->default(0);
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
        Schema::dropIfExists('products');
    }
}
