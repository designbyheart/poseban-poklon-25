<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = \App\UserRole::where('name', 'admin')->firstOrFail();

        $user = new \App\User([
            'email' => 'admin@abramus.eu',
            'username' => 'abramus123',
            'password' => Hash::make('***EMPQ2Wya3iBt')
        ]);

        $user->role()->associate($role);

        $user->save();
    }
}
