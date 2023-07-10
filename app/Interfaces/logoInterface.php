<?php

namespace App\Interfaces;

interface LogoInterface
{
    public function logoList();

    public function checkName($checkName);

    public function createLogo($request);

    public function activateLogo($id);

    public function logoDelete($id);
}
