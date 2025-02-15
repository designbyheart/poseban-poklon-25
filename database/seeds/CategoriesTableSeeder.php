<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = new \App\Category([
            'title' => 'VIP',
            'slug' => 'vip'
        ]);
        $category->save();

        $category = new \App\Category([
            'title' => 'Promotion',
            'slug' => 'promo'
        ]);
        $category->save();

        $category = new \App\Category([
            'title' => 'New',
            'slug' => 'novi'
        ]);
        $category->save();
    }
}
