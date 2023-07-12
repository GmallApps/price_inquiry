<?php

namespace App\Repositories;

use App\Interfaces\LogoInterface;
use App\Models\Logo;
use App\Traits\ResponseApi;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Validator;

class LogoRepository implements LogoInterface
{

    use ResponseApi;

    public function logoList()
    {
        $logolist = Logo::orderByDesc('id')->get();
        return $logolist;
        $count = count($logolist->get());

        $data = $logolist->skip($request->start)
                        ->take($request->length)
                        ->get();
        $totalRecords =  $totalDisplay = $count;
        return ['recordsTotal' => $totalRecords, 'recordsFiltered' => $totalDisplay,'data' =>$data];
    }

    public function checkName($checkName)
    {
        $checkName = Logo::where('name', $checkName)->get();
        $countResult = $checkName->count();

        if ($countResult == 0){
            return 0;
        }else{
            return 1;
        }
    }

    public function createLogo($request)
    {
        try{

            if ($request->hasFile('customer_logo_file') && $request->hasFile('admin_logo_file')) {

                $customer_logo = $request->file('customer_logo_file');

                $admin_logo = $request->file('admin_logo_file');

                $customer_extension = $customer_logo->getClientOriginalExtension();

                $admin_extension = $admin_logo->getClientOriginalExtension();

                if (strcasecmp($admin_extension,'png') == 0 && strcasecmp($customer_extension,'png') == 0){
                    Logo::where('status', 1)->update(['status' => 0]);

                    $logo = new Logo;

                    $logo->name = $request->logo_name;

                    $logo->status = 1;

                    $logo->save();

                    $customer_destination_path = public_path("/assets/logo_files/customer/");

                    $admin_destination_path = public_path("/assets/logo_files/admin/");

                    $customer_logo->move($customer_destination_path, $logo->id.".png");

                    $admin_logo->move($admin_destination_path, $logo->id.".png");

                    Log::error('attachment: ' .  $customer_logo);

                    return $this->success('Logo added successfully!',$customer_logo, 200);
                }else{
                    return $this->error('Only PNG files are allowed', 400);
                }

                
                
            }else{
                return $this->error('Please make sure all files are attached', 400);
                // return response()->json(['message' => 'Logo upload failed!'], 400);
            }
            
        }catch(Exception $e){

            DB::rollBack();

            return $this->error($e->getMessage(),$e->getCode());

        }
    }

    public function activateLogo($id)
    {
        $test = [];
        Logo::where('status', 1)->update(['status' => 0]);
        Logo::find($id)->update(['status' => 1]);
        
        return $this->success('Logo activated successfully!',$test, 200);
    }

    public function logoDelete($id)
    {
        $logo = Logo::find($id); // find the post with an id of 1
        $logo->delete();
        
        return $this->success('Logo successfully deleted!',[], 200);
    }

    public function inquiryLogo()
    {
        $compact = [];
        $logo = Logo::where('status',1)->get();
        $compact = [
            'id' => $logo[0]->id,
            'name' => $logo[0]->name
        ];
        return $compact;
    }

}
