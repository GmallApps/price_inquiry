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

    public function checkTerminal($terminal)
    {
        try{
            $checkIp = Ipaddress::where('ipaddress', $terminal)->get();
            $countResult = $checkIp->count();

            if ($countResult > 0){
                return 1;
            }else{
                return 0;
            }
        }catch(Exception $e){

            DB::rollBack();

            return $this->error($e->getMessage(),$e->getCode());

        }
    }

    public function createTerminal($request)
    {
        try{

            $ip = new Ipaddress;

            $ip->ipaddress = $request->ip_address;

            $ip->description = $request->description;

            $ip->status = 1;

            $ip->save();

            return $this->success('Terminal added successfully!',[], 200);

        }catch(Exception $e){

            DB::rollBack();

            return $this->error($e->getMessage(),$e->getCode());

        }
        

    }

    

}
