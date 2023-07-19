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
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin'),
                'status' => '1'
            ],
            [
                'firstname' => 'User2',
                'lastname' => 'User2',
                'email' => 'user2@gmail.com',
                'password' => Hash::make('user2'),
                'status' => '1'
            ]
           
        ];
        foreach ($users as $user){
            User::create($user);
        }
    }
}
