<?php

namespace App\Interfaces;

interface AdInterface
{
    public function adList();

    public function createAdvertisement($request);

    public function checkTitle($adTitle);
}
