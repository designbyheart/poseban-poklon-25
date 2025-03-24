<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ShippingMethod;
use Faker\Generator as Faker;

$factory->define(ShippingMethod::class, function (Faker $faker) {
    return [
        'title' => $faker->randomElement(['Standard Shipping', 'Express Shipping', 'E-Voucher']),
        'description' => $faker->sentence,
        'price' => $faker->randomFloat(2, 0, 15),
        'status' => 'active',
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
