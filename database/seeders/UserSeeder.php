<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'firstname' => 'Admin',
                'lastname' => 'Admin',
                'role' => 'ADMIN',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin'),
                'status' => '1'
            ],
            [
                'firstname' => 'Marketing',
                'lastname' => 'Marketing',
                'role' => 'MARKETING',
                'email' => 'marketing@gmail.com',
                'password' => Hash::make('marketing'),
                'status' => '1'
            ]
           
        ];
        foreach ($users as $user){
            User::create($user);
        }
    }
}
