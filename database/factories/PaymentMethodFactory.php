<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\PaymentMethod;
use Faker\Generator as Faker;

$factory->define(PaymentMethod::class, function (Faker $faker) {
    return [
        'title' => $faker->randomElement(['Cash', 'Bank Transfer', 'Credit Card']),
        'description' => $faker->sentence,
        'price' => $faker->randomFloat(2, 0, 5),
        'status' => 'active',
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
