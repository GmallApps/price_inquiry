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

    public function activateLogo($id)
    {
        return $this->logoInterface->activateLogo($id);
    }

    public function logoDelete($id)
    {
        return $this->logoInterface->logoDelete($id);
    }

    public function inquiryLogo()
    {
        return $this->logoInterface->inquiryLogo();
    }
}
