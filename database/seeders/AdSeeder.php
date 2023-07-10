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
                'ad_type' => 'video_gif',
                'file' => '1.mp4',
                'path' => 'assets/ad_files/',
                'status' => '1'
            ],
            [
                'title' => 'Ramadan',
                'ad_type' => 'slider',
                'file' => '2.gif',
                'path' => 'assets/ad_files/',
                'status' => '0'
            ]
           
        ];
        foreach ($ads as $ad){
            Ad::create($ad);
        }
    }
}
