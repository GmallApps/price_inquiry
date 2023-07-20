<?php

namespace App\Repositories;

use App\Interfaces\IpaddressInterface;
use App\Models\Ipaddress;
use App\Traits\ResponseApi;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Validator;

class IpaddressRepository implements IpaddressInterface
{

    use ResponseApi;

    public function ipaddressList()
    {
        $ipaddresslist = Ipaddress::orderByDesc('id')->get();
        return $ipaddresslist;
        $count = count($ipaddresslist->get());

        $data = $ipaddresslist->skip($request->start)
                        ->take($request->length)
                        ->get();
        $totalRecords =  $totalDisplay = $count;
        return ['recordsTotal' => $totalRecords, 'recordsFiltered' => $totalDisplay,'data' =>$data];
    }

}
