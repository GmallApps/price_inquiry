<?php

namespace App\Http\Controllers;

use App\Interfaces\AdInterface;
use App\Traits\ResponseApi;
use Illuminate\Http\Request;
use App\Models\Ad;

class AdController extends Controller
{
    use ResponseApi;

    protected $adInterface;

    public function __construct(AdInterface $adInterface)
    {
        $this->adInterface = $adInterface;
    }

    public function adList()
    {
        return $this->adInterface->adList();
    }

    public function createAdvertisement(Request $request)
    {
        return $this->adInterface->createAdvertisement($request);
    }
    
    public function checkTitle($adTitle)
    {
        return $this->adInterface->checkTitle($adTitle);
    }

    public function adPreview($previewId)
    {
        return $this->adInterface->adPreview($previewId);
    }
}
