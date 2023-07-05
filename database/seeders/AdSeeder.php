<?php

namespace Database\Seeders;

use App\Models\Ad;
use Illuminate\Database\Seeder;

class AdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ads = [
            [
                'title' => 'Christmas',
                'file' => 'christmas.mp4',
                'status' => '1'
            ],
            [
                'title' => 'Ramadan',
                'file' => 'Ramadan.gif',
                'status' => '0'
            ]
           
        ];
        foreach ($ads as $ad){
            Ad::create($ad);
        }
    }
}
