<?php

namespace Database\Seeders;

use App\Models\Ipaddress;
use Illuminate\Database\Seeder;

class IpaddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ipaddresses = [
            [
                'ipaddress' => '10.10.99.16',
                'description' => 'Developer IP',
                'status' => '1'
            ]
        ];
        foreach ($ipaddresses as $ipaddress){
            Ipaddress::create($ipaddress);
        }
    }
}
