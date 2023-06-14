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

        $promo_data = $this->db->table('invevt')->select('sku','start','stop','price')->where('sku',$invupc[0]->sku)->get();

        $invmst = $data->where('sku',$invupc[0]->sku)->get();

        $compact = [];

        $promo_count = $promo_data->count();
        
        $regular_price = [
            'sku' => $invupc[0]->sku,
            'short_descr' => $invmst[0]->short_descr,
            'price' => $invmst[0]->price,
            'upc' => $invupc[0]->upc
        ];

        // $currentDate = date("Y-m-d");
        if($promo_count != 0){

            $compact = [];

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
                }else{
                    $compact = [];
                    $compact = $regular_price;
                }

            }else{
                
                $promo_data_ordered = $this->db->table('invevt')->select('sku','start','stop','price')->where('sku',$invupc[0]->sku)->orderByDesc('code')->get();
                // foreach ($promo_data as $promo) {
                    Log::info('promo_data_ordered : ',$promo_data_ordered->toArray());
                    // date_default_timezone_set("UTC");
                    // dd(date_default_timezone_get());
                    $start_converted_date = $this->convertClarion($promo_data_ordered[0]->start);
                    $stopDate = $promo_data_ordered[0]->stop;
                    // $stopDateTime = new DateTime($stop_converted_date);
                    // Log::info('dateTime : ',$stopDateTime);
                    // dd($stopDateTime);
                    $isValidClarionDate=true;
                        try {
                            // $date = Carbon::createFromFormat('Y-m-d|', $stopDate); // Use the Clarion date format here
                            $isValidClarionDate = true;
                            $str_stop_converted_date = strval($this->convertClarion($stopDate));
                            if(intval(substr($str_stop_converted_date, 0, 1))>=1){
                                $isValidClarionDate = true;
                            }
                        } catch (\Exception $e) {
                            $isValidClarionDate = false;
                            Log::error('Invalid Clarion date: ' . $e->getMessage());
                            
                        }
                        
                            if ($isValidClarionDate) {

                                $stop_converted_date = $this->convertClarion($stopDate);

                                if( strtotime($currentDate) >= strtotime($start_converted_date) && strtotime($currentDate) <= strtotime($stop_converted_date) ){
                                    
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

                            } else {
                                // The date is not a valid Clarion date

                                if( strtotime($currentDate) >= strtotime($start_converted_date) ){
                                    
                                    $compact = [

                                        'sku' => $invupc[0]->sku,
                                        'short_descr' => $invmst[0]->short_descr,
                                        'price' => $promo_data_ordered[0]->price,
                                        'before' => $invmst[0]->price,
                                        'upc' => $invupc[0]->upc,
                                        'start_date' => $start_converted_date,
                                        'stop_date' => $stopDate
                                        
                                    ];
                            
                                }
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
        $start_timestamp = strtotime("December 28, 1800 +$startClarionDate days");
        $start_converted_date = date("Y-m-d", $start_timestamp);

        return $start_converted_date;

    }
    public function convertClarionForStop($clarionDate)
    {
        // uses January 1, 1900 reference date
        $stopClarionDate = strval($clarionDate);
        $stop_timestamp = ($stopClarionDate - 693593) * 86400;
        $stop_converted_date = date("Y-m-d", $stop_timestamp);

        return $stop_converted_date;

    }

    public function convertClarionForStop2($clarionDate)
    {
        // part2
        $year = substr($clarionDate, 0, 2);
    $month = str_pad(substr($clarionDate, 2, 2), 2, '0', STR_PAD_LEFT);
    $day = str_pad(substr($clarionDate, 4, 2), 2, '0', STR_PAD_LEFT);
    $fullYear = ($year < 50 ? '20' : '19').$year;
    return $fullYear.'-'.$month.'-'.$day;

    }
}
