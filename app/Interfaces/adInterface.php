<?php

namespace App\Interfaces;

interface AdInterface
{
    public function adList();

    public function createAdvertisement($request);

    public function updateAdvertisement($request);

    public function checkTitle($adTitle);

    public function adPreview($previewId);

    public function adEnable($enableId);

    public function adDelete($deleteId);
    
}
