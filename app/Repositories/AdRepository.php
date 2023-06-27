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
            // $checkTitle = Ad::where('title', $request->ad_title)->get();
            // $countResult = $checkTitle->count();

            

            $attachment = $request->ad_file;
            $size = $attachment->getSize();
            if ($size == ''){
                return $this->error('File exceeds 5mb.',400);
            }else if ($size < 5242880) {
                Ad::where('status', 1)->update(['status' => 0]);

                $ad = new Ad;
                $ad->title = $request->ad_title;
                $ad->file = 'Default';
                $ad->status = 1;
                $ad->save();

                $extension = $attachment->getClientOriginalExtension();
                $filename = $ad->id . '.' . $extension;

                // $path = Storage::put("ad_files/{$ad->id}.{$extension}", $attachment); //customize folder name for multiple files upload
                $filename = "{$ad->id}.{$extension}";
                // $path = Storage::putFileAs('ad_files', $request->file('ad_file'), $filename);
                if ($request->hasFile('ad_file')) {
                    $image = $request->file('ad_file');
                    $destination_path = public_path("/assets/ad_files/");
                    $image->move($destination_path, $ad->id.".{$extension}");
                    $extension = $attachment->getClientOriginalExtension();
                    Ad::find($ad->id)->update(['file' => "{$ad->id}."."{$extension}"]);
                    Log::error('attachment: ' .  $attachment);
                    return $this->success('Advertisement created successfully!',$attachment, 200);
                }

            }else{
                return $this->error('File exceeds 5mb.',400);
            }

            
        }catch(Exception $e){
            DB::rollBack();
            return $this->error($e->getMessage(),$e->getCode());
        }
    }

    public function updateAdvertisement($request)
    {
        try{
            $file_version = $request->ad_file_version;
            Log::error('title: ' .  $request->ad_title);
            Log::error('file version: ' .  $file_version);
            if ($file_version == 'new'){
                $attachment = $request->ad_file;
                $size = $attachment->getSize();
                if ($size == ''){
                    return $this->error('File exceeds 5mb.',400);
                }else if ($size < 5242880) {
                    $ad = Ad::where('id', $request->advertisement_id)->first();
                    $ad->title = $request->ad_title;
                    $ad->file = 'Default';
                    $ad->save();

                    $extension = $attachment->getClientOriginalExtension();
                    $filename = $ad->id . '.' . $extension;

                    $filename = "{$ad->id}.{$extension}";
                    
                    if ($request->hasFile('ad_file')) {
                        $image = $request->file('ad_file');
                        $destination_path = public_path("/assets/ad_files/");
                        $image->move($destination_path, $ad->id.".{$extension}");
                        $extension = $attachment->getClientOriginalExtension();
                        Ad::find($ad->id)->update(['file' => "{$ad->id}."."{$extension}"]);
                        return $this->success('Advertisement updated successfully!',$attachment, 200);
                    }
                }else{
                    return $this->error('File exceeds 5mb.',400);
                }
            }else{
                $attachment = [];
                $ad = Ad::where('id', $request->advertisement_id)->first();
                $ad->title = $request->ad_title;
                $ad->save();
                return $this->success('Advertisement title updated successfully!',$attachment, 200);
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

    public function adPreview($previewId)
    {
        return Ad::find($previewId);
    }

    public function adEnable($enableId)
    {
        $test = [];
        Ad::where('status', 1)->update(['status' => 0]);
        Ad::find($enableId)->update(['status' => 1]);
        
        return $this->success('Advertisement enabled successfully!',$test, 200);
    }


}
