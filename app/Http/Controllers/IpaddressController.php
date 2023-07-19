<?php

namespace App\Http\Controllers;

use App\Interfaces\IpaddressInterface;
use App\Traits\ResponseApi;
use App\Models\Ipaddress;
use Illuminate\Http\Request;

class IpaddressController extends Controller
{
    use ResponseApi;

    protected $ipaddressInterface;

    public function __construct(IpaddressInterface $ipaddressInterface)
    {
        $this->ipaddressInterface = $ipaddressInterface;
    }

    public function ipaddressList()
    {
        return $this->ipaddressInterface->ipaddressList();
    }
}
