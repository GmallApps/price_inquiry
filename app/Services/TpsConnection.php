<?php

namespace App\Services;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TpsConnection {
    protected  $db;

    public function __construct($dsn)
    {
        $this->db = DB::connection($dsn);
    }

    public function getItemBySKU($sku,$currentDate)
    {
        $data = $this->db->table('invmst')->select('sku','upc','short_descr','price');
        
        $invupc = $this->db->table('invupc')->select('sku','upc')->Where('upc',$sku)->get();

        $promo_data = $this->db->table('invevt')->select('sku','start','stop','price')->where('sku',$invupc[0]->sku)->get();

        $invmst = $data->where('sku',$invupc[0]->sku)->get();

        $compact = [];

        $promo_count = $promo_data->count();
        
        // $currentDate = date("Y-m-d");
        if($promo_count != 0){
            if($promo_count == 1){
                
                $start_converted_date = $this->convertClarion($promo_data[0]->start);

                $end_converted_date = $this->convertClarion($promo_data[0]->stop);

                if( strtotime($currentDate) >= strtotime($start_converted_date) && strtotime($currentDate) <= strtotime($end_converted_date) ){
                    $compact = [
                        'sku' => $invupc[0]->sku,
                        'short_descr' => $invmst[0]->short_descr,
                        'price' => $promo_data[0]->price,
                        'before' => $invmst[0]->price,
                        'upc' => $invupc[0]->upc,
                        'start_date' => $start_converted_date,
                        'stop_date' => $end_converted_date
                    ];
                
                }

            }else{
                $promo_data_ordered = $this->db->table('invevt')->select('sku','start','stop','price')->where('sku',$invupc[0]->sku)->orderByDesc('code')->get();
                // foreach ($promo_data as $promo) {

                    $start_converted_date = $this->convertClarion($promo_data_ordered[0]->start);
                    $stopDate = $promo_data_ordered[0]->stop;
                    
                    try {
                        $date = Carbon::createFromFormat('Y-m-d|', $stopDate); // Use the Clarion date format here
                        $isValidClarionDate = true;
                    } catch (\Exception $e) {
                        $isValidClarionDate = false;
                    }
                    
                    if ($isValidClarionDate) {

                        $stop_converted_date = $this->convertClarion($stopDate);

                        if( strtotime($currentDate) >= strtotime($start_converted_date) && strtotime($currentDate) <= strtotime($end_converted_date) ){
                            
                            $compact = [
                                'sku' => $invupc[0]->sku,
                                'short_descr' => $invmst[0]->short_descr,
                                // 'price' => $promo->price,
                                'price' => $promo_data_ordered[0]->price,
                                'before' => $invmst[0]->price,
                                'upc' => $invupc[0]->upc,
                                'start_date' => $start_converted_date,
                                'stop_date' => $end_converted_date
                    
                            ];
                    
                        }

                    } else {
                        // The date is not a valid Clarion date
                        if( strtotime($currentDate) >= strtotime($start_converted_date) ){
                            
                            $compact = [

                                'sku' => $invupc[0]->sku,
                                'short_descr' => $invmst[0]->short_descr,
                                'price' => $promo_data_ordered[0]->price,
                                'before' => $invmst[0]->price,
                                'upc' => $invupc[0]->upc,
                                'start_date' => $start_converted_date
                    
                            ];
                    
                        }
                    }
                    
                    
                //}
            }
        }else{
            $compact = [
                'sku' => $invupc[0]->sku,
                'short_descr' => $invmst[0]->short_descr,
                'buy_unit' => $invmst[0]->buy_unit,
                'ven_no' => $invmst[0]->ven_no,
                'price' => $invmst[0]->price,
                'vendor' => $invmst[0]->vendor,
                'upc' => $invupc[0]->upc
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

    public function convertClarion($clarionDate)
    {

        $startClarionDate = strval($clarionDate);
        $start_timestamp = strtotime("December 28, 1800 +$startClarionDate days");
        $start_converted_date = date("Y-m-d", $start_timestamp);

        return $start_converted_date;

    }
}
