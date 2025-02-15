<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        $this->call(CategoriesTableSeeder::class);
//        $this->call(UserRolesTableSeeder::class);
//        $this->call(SettingsTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CurrencyTableSeeder::class);
        $this->call(BuilderLayoutsTableSeeder::class);
        $this->call(FiltersTableSeeder::class);
    }
}
