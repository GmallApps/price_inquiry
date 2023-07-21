<?php

namespace App\Interfaces;

interface IpaddressInterface
{
    public function checkTerminal($terminal);

    public function getIpDetails($id);

    public function createTerminal($request);

    public function updateTerminal($request);

    public function ipaddressList();

    public function activateIp($id);

    public function deactivateIp($id);

    public function terminalDelete($id);

    
}
