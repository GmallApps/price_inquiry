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

    public function bipIndexView()
    {
        return view('pages.bip.bip_index',['businessUnits' => BusinessUnit::get()]);
    }

    public function getStoreInformation($barcode)
    { 
        $tps = new TpsConnection('odbc_2001');
        if(empty($tps->getItemBySKU($barcode))) return $this->error("Invalid Code", 400);
        return $tps->getItemBySKU($barcode);
    }

    


}
