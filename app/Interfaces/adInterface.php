<?php

namespace App\Interfaces;

interface adInterface
{
    /**
     * @method GET /ad-list
     */
    public function adList($meta,$status);
}
