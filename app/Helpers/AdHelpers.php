<?php

namespace App\Helpers;

use Error;
use App\Models\User;
use App\Models\Ad;
use Illuminate\Support\Facades\Storage;

class AdHelpers{
    /**
     * View For Ads
     *
     * @return App\Models\Ad
     */
    public function adList()
    {
        return Ad::all();
    }
    
}
