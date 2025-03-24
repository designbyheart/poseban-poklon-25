<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Order;
use App\PaymentMethod;
use App\ShippingMethod;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    return [
        'customer_name' => $faker->firstName,
        'customer_surname' => $faker->lastName,
        'customer_email' => $faker->email,
        'email' => $faker->safeEmail,
        'phone' => $faker->phoneNumber,
        'country' => $faker->country,
        'city' => $faker->city,
        'address' => $faker->streetAddress,
        'postal_code' => $faker->postcode,
        'payment_method_id' => function () {
            return factory(PaymentMethod::class)->create()->id;
        },
        'shipping_method_id' => function () {
            return factory(ShippingMethod::class)->create()->id;
        },
        'total' => $faker->randomFloat(2, 10, 1000),
        'subtotal' => $faker->randomFloat(2, 10, 1000),
        'discount' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
