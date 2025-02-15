<?php

use Illuminate\Database\Seeder;

class BuilderLayoutsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $builderLayout = new \App\BuilderLayout([
            'title' => 'Home page layout',
            'slug' => 'home'
        ]);
        $builderLayout->save();
    }
}
