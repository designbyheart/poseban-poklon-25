<?php

use Illuminate\Database\Seeder;

class FiltersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $filter = new \App\Filter([
            'name' => 'City',
            'slug' => 'location'
        ]);
        $filter->save();

        $filter = new \App\Filter([
            'name' => 'Number of visitors',
            'slug' => 'visitors'
        ]);
        $filter->save();
    }
}
