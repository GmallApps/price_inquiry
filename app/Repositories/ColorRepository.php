<?php

namespace App\Repositories;

use App\Interfaces\ColorInterface;
use App\Models\Color;
use App\Traits\ResponseApi;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Facades\Validator;

class ColorRepository implements ColorInterface
{

    use ResponseApi;

    public function colorList()
    {
        $adlist = Color::orderByDesc('id')->get();
        return $adlist;
        $count = count($adlist->get());

        $data = $adlist->skip($request->start)
                        ->take($request->length)
                        ->get();
        $totalRecords =  $totalDisplay = $count;
        return ['recordsTotal' => $totalRecords, 'recordsFiltered' => $totalDisplay,'data' =>$data];
    }

    public function checkColor($colorCode)
    {
        Log::error('test checkColor: ' .  $colorCode); 

        $checkColor = Color::where('code', $colorCode)->get();
        $countResult = $checkColor->count();

        if ($countResult == 0){
            return 0;
        }else{
            return 1;
        }
    }

    public function addColor($request)
    {
        try{
            Log::error('test color: ' .  $request);
            Color::where('status', 1)->update(['status' => 0]);

            $color = new Color;
            $color->code = $request->color_input;
            $color->status = 1;
            $color->save();

            
        }catch(Exception $e){
            DB::rollBack();
            return $this->error($e->getMessage(),$e->getCode());
        }
    }

    public function bgColor()
    {
        $compact = [];
        $color = Color::select('code')->where('status',1)->get();
        $compact = [
            'code' => $color[0]->code
        ];
        return $compact;
    }

    public function activateColor($id)
    {
        $test = [];
        Color::where('status', 1)->update(['status' => 0]);
        Color::find($id)->update(['status' => 1]);
        
        return $this->success('Color Activated successfully!',$test, 200);
    }

    public function bgColorDelete($id)
    {
        $color = Color::find($id); // find the post with an id of 1
        $color->delete();
        
        return $this->success('Color successfully deleted!',[], 200);
    }

}
