<?php

use Illuminate\Database\Seeder;

class CurrencyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currency = new \App\Currency([
            'title' => 'Serbian Dinar',
            'code' => 'RSD'
        ]);
        $currency->save();
    }
}
