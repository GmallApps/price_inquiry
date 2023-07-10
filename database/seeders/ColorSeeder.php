<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = [
            [
                'code' => '#94d952',
                'status' => '1'
            ],
            [
                'code' => '#c70000',
                'status' => '0'
            ]
           
        ];
        foreach ($colors as $color){
            Color::create($color);
        }
    }
}
