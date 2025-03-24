<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\PaymentMethod;
use Faker\Generator as Faker;

$factory->define(PaymentMethod::class, function (Faker $faker) {
    return [
        'name' => $faker->randomElement(['Cash', 'Bank Transfer', 'Credit Card']),
        'description' => $faker->sentence,
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
