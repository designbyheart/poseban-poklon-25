<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Voucher;
use App\Order;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(Voucher::class, function (Faker $faker) {
    return [
        'voucher_code' => strtoupper($faker->regexify('[A-Z0-9]{10}')),
        'status' => 'active',
        'order_id' => function () {
            return factory(Order::class)->create()->id;
        },
        'expires_at' => Carbon::now()->addYear(),
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
