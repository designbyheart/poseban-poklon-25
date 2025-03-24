<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'title' => $faker->words(3, true),
        'description' => $faker->paragraph,
        'price' => $faker->randomFloat(2, 10, 1000),
        'image' => 'test-image.jpg',
        'status' => 'active',
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
