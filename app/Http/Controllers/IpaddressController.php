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
        return $this->ipaddressInterface->checkTerminal($ipAddress);
    }

    public function createTerminal(Request $request)
    {
        return $this->ipaddressInterface->createTerminal($request);
    }

    public function getIpDetails($id)
    {
        return $this->ipaddressInterface->getIpDetails($id);
    }

    public function updateTerminal(Request $request)
    {
        return $this->ipaddressInterface->updateTerminal($request);
    }

    public function activateIp($id)
    {
        return $this->ipaddressInterface->activateIp($id);
    }

    public function deactivateIp($id)
    {
        return $this->ipaddressInterface->deactivateIp($id);
    }

    public function terminalDelete($id)
    {
        return $this->ipaddressInterface->terminalDelete($id);
    }
}
