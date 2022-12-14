<?php

namespace App\Services;
use Illuminate\Support\Facades\DB;
class TpsConnection {
    protected  $db;

    public function __construct($dsn)
    {
        $this->db = DB::connection($dsn);
    }

    public function getItemBySKU($sku)
    {
        $data = $this->db->table('invmst')->select('sku','upc','short_descr','price','ven_no','vendor','buy_unit');
        
          $invupc = $this->db->table('invupc')->select('sku','upc')->Where('upc',$sku)->get();
          $invmst = $data->where('sku',$invupc[0]->sku)->get();

          $compact = [
          'sku' => $invupc[0]->sku,
          'short_descr' => $invmst[0]->short_descr,
          'buy_unit' => $invmst[0]->buy_unit,
          'ven_no' => $invmst[0]->ven_no,
          'price' => $invmst[0]->price,
          'vendor' => $invmst[0]->vendor,
          'upc' => $invupc[0]->upc];

          return array($compact);
    }

    public function getStorelist()
    {
        return $this->db->table('strmst')->select('store','name')->get()->toArray();
    }

    public function getStoreByID($store_name)
    {
        return $this->db->table('strmst')->select('store')->where('name', $store_name)->get()->toArray();
    }
}
