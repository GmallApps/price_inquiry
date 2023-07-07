<?php

namespace App\Interfaces;

interface LogoInterface
{
    public function logoList();

    public function checkName($checkName);

    public function createLogo($request);
}
