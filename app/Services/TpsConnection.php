<?php

namespace App\Services;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

        $promo_data = $this->db->table('invevt')->select('sku','start','stop','price','pricetype')->where('sku',$invupc[0]->sku)->where('pricetype','RET')->get();

        $invmst = $data->where('sku',$invupc[0]->sku)->get();

        $compact = [];

        $promo_count = $promo_data->count();
        
        $regular_price = [
            'sku' => $invupc[0]->sku,
            'short_descr' => $invmst[0]->short_descr,
            'price' => $invmst[0]->price,
            'upc' => $invupc[0]->upc
        ];

        $currentDateTime = Carbon::parse($currentDate);

        // $currentDate = date("Y-m-d");
        if($promo_count != 0){

            $compact = [];

            if($promo_count == 1){
                
                $start_converted_date = $this->convertClarion($promo_data[0]->start);

                $end_converted_date = $this->convertClarion($promo_data[0]->stop);

                $startConvertedDate = Carbon::parse($start_converted_date);

                $endConvertedDate = Carbon::parse($end_converted_date);

                Log::error('start_converted_date: ' . $start_converted_date);

                $isValidClarionDate=true;
               
                Log::error('endConvertedDate: ' . $endConvertedDate);
                if( $currentDateTime->gte($startConvertedDate) && $currentDateTime->lte($endConvertedDate) ){
                    $compact = [
                        'sku' => $invupc[0]->sku,
                        'short_descr' => $invmst[0]->short_descr,
                        'price' => $promo_data[0]->price,
                        'before' => $invmst[0]->price,
                        'upc' => $invupc[0]->upc,
                        'start_date' => $start_converted_date,
                        'stop_date' => $end_converted_date
                    ];
                }else{
                    $compact = [];
                    $compact = $regular_price;
                }
                

            }else{
                
                $promo_data_ordered = $this->db->table('invevt')->select('sku','start','stop','price','pricetype')->where('sku',$invupc[0]->sku)->where('pricetype','RET')->orderByDesc('code')->get();
                // foreach ($promo_data as $promo) {
                    Log::info('promo_data_ordered : ',$promo_data_ordered->toArray());

                    $price_type = $promo_data_ordered[0]->pricetype;
                    
                    $start_converted_date = $this->convertClarion($promo_data_ordered[0]->start);

                    $stop_converted_date = $this->convertClarion($promo_data_ordered[0]->stop);

                    $startConvertedDate = Carbon::parse($start_converted_date);

                    $stopConvertedDate = Carbon::parse($stop_converted_date);

                    if( $currentDateTime->gte($startConvertedDate) && $currentDateTime->lte($stopConvertedDate) ){
                        
                        $compact = [
                            'sku' => $invupc[0]->sku,
                            'short_descr' => $invmst[0]->short_descr,
                            // 'price' => $promo->price,
                            'price' => $promo_data_ordered[0]->price,
                            'before' => $invmst[0]->price,
                            'upc' => $invupc[0]->upc,
                            'start_date' => $start_converted_date,
                            'stop_date' => $stop_converted_date
                
                        ];
                
                    }

                            
                    
                    
                //}
            }
        }

        if (empty($compact)) {
            $compact = $regular_price;
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
        // uses December 28, 1800

        $startClarionDate = strval($clarionDate);
        $startDateTime = Carbon::create(1800, 12, 28)->addDays($startClarionDate);
        $startConvertedDate = $startDateTime->format('Y-m-d');
        Log::error('conversion: ' . $startConvertedDate);

        return $startConvertedDate;

    }
    
}
