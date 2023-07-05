<?php

namespace App\Interfaces;

interface ColorInterface
{
    public function colorList();

    public function checkColor($colorCode);

    public function addColor($request);

    public function bgColor();

    public function activateColor($id);

    public function bgColorDelete($id);
}
