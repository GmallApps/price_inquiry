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

    public function updateAdvertisement(Request $request)
    {
        return $this->adInterface->updateAdvertisement($request);
    }
    
    public function checkTitle($adTitle)
    {
        return $this->adInterface->checkTitle($adTitle);
    }

    public function adPreview($previewId)
    {
        return $this->adInterface->adPreview($previewId);
    }

    public function adEnable($enableId)
    {
        return $this->adInterface->adEnable($enableId);
    }
    
    public function adDelete($deleteId)
    {
        return $this->adInterface->adDelete($deleteId);
    }

    public function inquiryAd()
    {
        return $this->adInterface->inquiryAd();
    }
}
