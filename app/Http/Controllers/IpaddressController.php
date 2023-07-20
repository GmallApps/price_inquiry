<?php

namespace App\Http\Controllers;

use App\Interfaces\IpaddressInterface;
use App\Traits\ResponseApi;
use App\Models\Ipaddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function checkTerminal($ipAddress)
    {
        Log::error('ipAddress: ' .  $ipAddress);
        return $this->ipaddressInterface->checkIp($ipAddress);
    }

    public function createTerminal(Request $request)
    {Log::error('request: ' .  $request);
        return $this->ipaddressInterface->createTerminal($request);
    }
}
