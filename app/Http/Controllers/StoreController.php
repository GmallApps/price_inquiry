<?php

namespace App\Http\Controllers;

use App\Imports\MasterStoreImport;
use Illuminate\Http\Request;
use App\Traits\ResponseApi;
use Illuminate\Support\Facades\Storage;
use App\Models\StoreMigration;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Store;
use App\Models\StoreCode;
use App\Models\BusinessUnit;
use App\Services\TpsConnection;
use Dompdf\Dompdf;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

class StoreController extends Controller
{
    use ResponseApi;

    public function formData(Request $request)
    {
        return $request->all();
    }

    public function storeMigration()
    {
        $files = Storage::files('imports');
        $flag = false;

        foreach($files as $file)
        {
            $filename = explode('/',$file)[1];
           if(!StoreMigration::where('migration', $filename)->first()){
                Excel::import(new MasterStoreImport, $file);
                StoreMigration::create(['migration' => $filename]);
                $flag = true;
           }
        }

        if(!$flag) return $this->error('Nothing to migrate', 400);

        return $this->success('Success', null, 201);
    }

    public function inquiryIndexView()
    {
        // return view('pages.inquiry.inquiry_index',['businessUnits' => BusinessUnit::get()]);
        return view('pages.inquiry.inquiry_index');
    }

    public function getStoreInformation(Request $request, $barcode)
    { 
        $current_date = $request->input('current_date');
        $tps = new TpsConnection('spm_tps');
        if(empty($tps->getItemBySKU($barcode,$current_date))) return $this->error("Invalid Code", 400);
        return $tps->getItemBySKU($barcode,$current_date);
    }

    public function getIpAddress(Request $request)
    { 
        $ipAddress = $request->ip();
        return "Your IP address is: " . $ipAddress;
    }

    


}
