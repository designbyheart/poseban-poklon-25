<?php

use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_role = new \App\UserRole([
            'name' => 'user',
            'description' => 'User'
        ]);
        $user_role->save();

        $user_role = new \App\UserRole([
            'name' => 'admin',
            'description' => 'Admin'
        ]);
        $user_role->save();

        $user_role = new \App\UserRole([
            'name' => 'editor',
            'description' => 'Editor'
        ]);
        $user_role->save();

        $user_role = new \App\UserRole([
            'name' => 'shop_editor',
            'description' => 'Shop editor'
        ]);
        $user_role->save();

        $user_role = new \App\UserRole([
            'name' => 'architect',
            'description' => 'Architect'
        ]);
        $user_role->save();
    }
}
