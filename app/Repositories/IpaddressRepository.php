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

            return Ipaddress::where('ipaddress', $terminal)->get();

        }catch(Exception $e){

            DB::rollBack();

            return $this->error($e->getMessage(),$e->getCode());

        }
    }

    public function getIpDetails($id)
    {
        return Ipaddress::find($id);
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

            // return $this->error($e->getMessage(),$e->getCode());
            return $this->error('Duplicate Entry', 400);

        }
        

    }

    public function updateTerminal($request)
    {
        try{

            Ipaddress::find($request->terminal_id)->update(['ipaddress' => $request->ip_address, 'description' => $request->description]);

            return $this->success('Terminal updated successfully!',[], 200);

        }catch(Exception $e){

            DB::rollBack();

            return $this->error($e->getMessage(),$e->getCode());

        }
        

    }

    public function activateIp($id)
    {
        
        Ipaddress::find($id)->update(['status' => 1]);
        
        return $this->success('Terminal activated successfully!',[], 200);
    }

    public function deactivateIp($id)
    {
        Ipaddress::find($id)->update(['status' => 0]);
        
        return $this->success('Terminal deactivated successfully!',[], 200);
    }

    public function terminalDelete($id)
    {

        $ip = Ipaddress::find($id); 

        $ip->delete();
        
        return $this->success('Terminal successfully deleted!',[], 200);

    }

}
