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
// use Illuminate\Support\Facades\Validator;

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

                if ($request->hasFile('ad_file')) {

                    if ($request->ad_type == 'video_gif'){

                        foreach($request->file('ad_file') as $attached_file)
                        {

                            $image = $attached_file;

                            $extension = $attached_file->getClientOriginalExtension();

                            if ($extension == 'mp4' || $extension == 'gif') {

                                Ad::where('status', 1)->update(['status' => 0]);

                                $ad = new Ad;

                                $ad->title = $request->ad_title;

                                $ad->ad_type = $request->ad_type;

                                $ad->file = 'Default';

                                $ad->path = 'assets/ad_files/';

                                $ad->status = 1;

                                $ad->save();

                                $destination_path = public_path("/assets/ad_files/");

                                $image->move($destination_path, $ad->id.".{$extension}");

                                Log::error('attachment: ' .  $attached_file);

                                Ad::find($ad->id)->update(['file' => $ad->id.".{$extension}" ]);

                                return $this->success('Advertisement created successfully!',$attached_file, 200);

                            }else{
                                return $this->error('Incorrect file format', 400);
                            }

                            break;

                        }
                       
                    }else{

                        $count_error = 0;

                        foreach($request->file('ad_file') as $attached_file)
                        {
                            $extension = $attached_file->getClientOriginalExtension();
                            if ($extension != 'jpg'){
                                $count_error = 1;
                            }
                        }

                        if($count_error == 0){
                            Ad::where('status', 1)->update(['status' => 0]);

                            $ad = new Ad;

                            $ad->title = $request->ad_title;

                            $ad->ad_type = $request->ad_type;

                            $ad->file = 'Default';

                            $ad->path = 'assets/slider_files/';

                            $ad->status = 1;

                            $ad->save();

                            $image;

                            $attached_files = []; 

                            $destination_path = public_path("/assets/slider_files/$ad->id");

                            foreach($request->file('ad_file') as $attached_file)
                            {
                                $image = $attached_file;

                                $the_file = $image->getClientOriginalName();

                                $image->move($destination_path, $the_file);
                                
                                array_push($attached_files, $the_file);
                            }
                            
                            Ad::find($ad->id)->update(['file' => $attached_files ]);

                            return $this->success('Advertisement created successfully!',$attached_files, 200);
                        }else{

                            return $this->error('Incorrect file format', 400);

                        }
                        

                    }
                    
                }else{
                    return $this->error('No attached file!', 400);
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

            $revised_field = '';

            if ($request->hasFile('ad_file')) {

                if ($request->ad_type == 'video_gif'){
                
                    // start edit code
                    if ($file_version == 'new'){
                        
                        
    
                        foreach($request->file('ad_file') as $attached_file)
                        {
                            
                            $image = $attached_file;
    
                            $destination_path = public_path("/assets/ad_files/");
    
                            $extension = $attached_file->getClientOriginalExtension();

                            if ($extension == 'mp4' || $extension == 'gif') {
                                
                                $ad = Ad::where('id', $request->advertisement_id)->first();

                                $ad->title = $request->ad_title;

                                $ad->ad_type = $request->ad_type;

                                $ad->file = 'Default';

                                $ad->path = 'assets/ad_files/';

                                $ad->save();

                                $image->move($destination_path, $ad->id.".{$extension}");
    
                                Log::error('attachment: ' .  $attached_file);
        
                                Ad::find($ad->id)->update(['file' => $ad->id.".{$extension}" ]);
        
                                return $this->success('Advertisement successfully updated!',$attached_file, 200);
                            
                            }else{
                                
                                return $this->error('Incorrect file format', 400);

                            }
    
                        }
                        
                    }else{

                        $revised_field = 'title';
                        
                    }
                    // end edit code
    
                    
                   
                }else{

                    $count_error = 0;

                    foreach($request->file('ad_file') as $attached_file)
                    {
                        $extension = $attached_file->getClientOriginalExtension();
                        if ($extension != 'jpg'){
                            $count_error = 1;
                        }
                    }

                    if($count_error == 0){

                        // start edit code
                        if ($file_version == 'new'){
                            
                            $ad = Ad::where('id', $request->advertisement_id)->first();

                            $ad->title = $request->ad_title;

                            $ad->ad_type = $request->ad_type;

                            $ad->file = 'Default';

                            $ad->path = 'assets/slider_files/';

                            $ad->save();
        
                            $attached_files = []; 
            
                            $destination_path = public_path("/assets/slider_files/$ad->id");
            
                            foreach($request->file('ad_file') as $attached_file)
                            {
                                $image = $attached_file;
            
                                $the_file = $image->getClientOriginalName();
            
                                $image->move($destination_path, $the_file);
                                
                                array_push($attached_files, $the_file);
                            }
                            
                            Ad::find($ad->id)->update(['file' => $attached_files ]);
            
                            return $this->success('Advertisement successfully updated!',$attached_files, 200);
                            
                        }else{

                            $revised_field = 'title';
                            
                        }
                        // end edit code
                    }else{

                        return $this->error('Incorrect file format', 400);

                    }
                }
            }else{
                $revised_field = 'title';
            }

            if ($revised_field == 'title') {

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

    public function adDelete($deleteId)
    {
        $ad = Ad::find($deleteId); // find the post with an id of 1
        $ad->delete();
        
        return $this->success('Advertisement successfully deleted!',[], 200);
    }

    public function inquiryAd()
    {
        $compact = [];
        $ad = Ad::where('status',1)->get();
        $compact = [
            'id' => $ad[0]->id,
            'file' => $ad[0]->file,
            'ad_type' => $ad[0]->ad_type
        ];
        return $compact;
    }

}
