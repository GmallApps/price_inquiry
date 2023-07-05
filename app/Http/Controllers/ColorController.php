<?php

namespace App\Http\Controllers;

use App\Interfaces\ColorInterface;
use App\Traits\ResponseApi;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ColorController extends Controller
{
    use ResponseApi;

    protected $adInterface;

    public function __construct(ColorInterface $colorInterface)
    {
        $this->colorInterface = $colorInterface;
    }

    public function colorList()
    {
        return $this->colorInterface->colorList();
    }

    public function checkColor($colorCode)
    {   Log::error('test: ' .  $colorCode);
        return $this->colorInterface->checkColor($colorCode);
    }

    public function addColor(Request $request)
    {
        return $this->colorInterface->addColor($request);
    }

    public function bgColor()
    {
        return $this->colorInterface->bgColor();
    }

    public function activateColor($id)
    {
        return $this->colorInterface->activateColor($id);
    }

    public function bgColorDelete($id)
    {
        return $this->colorInterface->bgColorDelete($id);
    }
}
