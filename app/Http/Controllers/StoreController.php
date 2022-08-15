<?php

namespace App\Http\Controllers;

use App\Imports\MasterStoreImport;
use Illuminate\Http\Request;
use App\Traits\ResponseApi;
use Illuminate\Support\Facades\Storage;
use App\Models\StoreMigration;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Store;
use App\Services\TpsConnection;
class StoreController extends Controller
{
    use ResponseApi;
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
        return view('pages.bip.bip_index',['stores' => Store::get()]);
    }

    public function getStoreInformation(Request $request, $barcode)
    {
        $tps_2001 = new TpsConnection('odbc_2001');
        return $tps_2001->getItemBySKU($barcode);

    }
}
