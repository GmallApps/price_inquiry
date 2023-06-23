<?php

namespace App\Repositories;

use App\Interfaces\AdInterface;
use App\Models\Ad;
use App\Models\User;
use App\Traits\ResponseApi;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AdRepository implements AdInterface
{

    use ResponseApi;

    public function adList()
    {
        // $adlist = Ad::all();
        $adlist = Ad::orderByDesc('id')->get();
        return $adlist;
        $count = count($adlist->get());

        $data = $adlist->skip($request->start)
                        ->take($request->length)
                        ->get();
        $totalRecords =  $totalDisplay = $count;
        return ['recordsTotal' => $totalRecords, 'recordsFiltered' => $totalDisplay,'data' =>$data];
    }

    public function createAdvertisement($request)
    {
        try{
            $checkTitle = Ad::where('title', $request->ad_title)->get();
            $countResult = $checkTitle->count();

            $attachment = $request->ad_file;
            $size = $attachment->getSize();
            if ($size == '' || $countResult > 0){
                return $this->error('File exceeds 5mb or title already exist.',400);
            }else if ($size < 5242880) {
                Ad::where('status', 1)->update(['status' => 0]);

                $ad = new Ad;
                $ad->title = $request->ad_title;
                $ad->file = 'Default';
                $ad->status = 1;
                $ad->save();

                $extension = $attachment->getClientOriginalExtension();
                $filename = $ad->id . '.' . $extension;

                $path = Storage::put("ad_files/{$ad->id}.{$extension}", $attachment);
                $extension = $attachment->getClientOriginalExtension();
                Ad::find($ad->id)->update(['file' => "ad_files/{$ad->id}."."{$extension}"]);
                Log::error('attachment: ' .  $attachment);
                return $this->success('Advertisement created successfully!',$attachment, 200);

            }else{
                return $this->error('File exceeds 5mb.',400);
            }

            
        }catch(Exception $e){
            DB::rollBack();
            return $this->error($e->getMessage(),$e->getCode());
        }
    }

    public function checkTitle($adTitle)
    {
        $checkTitle = Ad::where('title', $adTitle)->get();
        $countResult = $checkTitle->count();

        if ($countResult == 0){
            return 0;
        }else{
            return 1;
        }
    }

}