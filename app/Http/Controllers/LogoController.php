<?php

namespace App\Http\Controllers;

use App\Interfaces\LogoInterface;
use App\Traits\ResponseApi;
use App\Models\Logo;
use Illuminate\Http\Request;

class LogoController extends Controller
{
    use ResponseApi;

    protected $logoInterface;

    public function __construct(LogoInterface $logoInterface)
    {
        $this->logoInterface = $logoInterface;
    }

    public function logoList()
    {
        return $this->logoInterface->logoList();
    }

    public function checkName($logoName)
    {
        return $this->logoInterface->checkName($logoName);
    }

    public function createLogo(Request $request)
    {
        return $this->logoInterface->createLogo($request);
    }
}
