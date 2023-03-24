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
        $promo_data = $this->db->table('invevt')->select('sku','start','stop','price')->where('sku',$invupc[0]->sku)->get();
        $invmst = $data->where('sku',$invupc[0]->sku)->get();
        $invevt = [];
        $compact = [];
        
        if($promo_data->count() == 1){ // finished testing this condition : remarks : ok
            $startClarionDate =  strval($promo_data[0]->start);
            $start_timestamp = strtotime("December 28, 1800 +$startClarionDate days");
            $start_converted_date = date("Y-m-d", $start_timestamp);

            $endClarionDate = strval($promo_data[0]->stop);
            $end_timestamp = strtotime("December 28, 1800 +$endClarionDate days");
            $end_converted_date = date("Y-m-d", $end_timestamp);

            $currentDate = date("Y-m-d");

            if( strtotime($currentDate) >= strtotime($start_converted_date) && strtotime($currentDate) <= strtotime($end_converted_date) ){
                $compact = [
                    'sku' => $invupc[0]->sku,
                    'short_descr' => $invmst[0]->short_descr,
                    'buy_unit' => $invmst[0]->buy_unit,
                    'ven_no' => $invmst[0]->ven_no,
                    'price' => $promo_data[0]->price,
                    'before' => $invmst[0]->price,
                    'vendor' => $invmst[0]->vendor,
                    'upc' => $invupc[0]->upc,
                    'start_date' => $start_converted_date,
                    'stop_date' => $end_converted_date

                ];
          
            }
        }else{
            foreach ($promo_data as $promo) {
                // $invevt[] = [
                //     'start' => $promo->start,
                //     'stop' => $promo->stop,
                //     'sku' => $promo->sku,
                //     'price' => $promo->price,
                // ];
                $startDate = $promo->start;
                $endDate = $promo->stop;
            
                $startClarionDate =  strval($startDate);
                $start_timestamp = strtotime("December 28, 1800 +$startClarionDate days");
                $start_converted_date = date("Y-m-d", $start_timestamp);
            
                $endClarionDate = strval($endDate);
                $end_timestamp = strtotime("December 28, 1800 +$endClarionDate days");
                $end_converted_date = date("Y-m-d", $end_timestamp);
            
                $currentDate = date("Y-m-d");
            
                if( strtotime($currentDate) >= strtotime($start_converted_date) && strtotime($currentDate) <= strtotime($end_converted_date) ){
                    $compact = [
                        'sku' => $invupc[0]->sku,
                        'short_descr' => $invmst[0]->short_descr,
                        'buy_unit' => $invmst[0]->buy_unit,
                        'ven_no' => $invmst[0]->ven_no,
                        'price' => $promo->price,
                        'before' => $invmst[0]->price,
                        'vendor' => $invmst[0]->vendor,
                        'upc' => $invupc[0]->upc,
                        'start_date' => $startClarionDate,
                        'stop_date' => $endClarionDate
            
                    ];
              
                }
            }
        }
        if (empty($compact)) {
            $compact = [
                'sku' => $invupc[0]->sku,
                'short_descr' => $invmst[0]->short_descr,
                'buy_unit' => $invmst[0]->buy_unit,
                'ven_no' => $invmst[0]->ven_no,
                'price' => $invmst[0]->price,
                'vendor' => $invmst[0]->vendor,
                'upc' => $invupc[0]->upc,
                //'start_date' => strval($invevt)
            ];
        }

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
