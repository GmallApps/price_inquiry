<?php

namespace App\Repositories;

use Error;
use Throwable;
use App\Traits\ResponseAPI;
use App\Helpers\RequisitionHelpers;
use App\Interfaces\RequisitionViewInterface;

class RequisitionViewRepository extends RequisitionHelpers implements RequisitionViewInterface{

    use ResponseAPI;


    /**
     * View for viewing requisition
     * @param string $access_level
     *
     * @return view
     */
    public function requisitionListView($access_level)
    {
       return view('pages.requisitions.view_requisition',['access_level' => $access_level]);
    }
    
}
