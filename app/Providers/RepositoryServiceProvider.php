<?php

namespace App\Providers;

use App\Interfaces\AdInterface;
use App\Interfaces\ColorInterface;
use App\Interfaces\LogoInterface;
use App\Interfaces\IpaddressInterface;

use App\Repositories\AdRepository;
use App\Repositories\ColorRepository;
use App\Repositories\LogoRepository;
use App\Repositories\IpaddressRepository;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
     /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AdInterface::class, AdRepository::class);
        $this->app->bind(ColorInterface::class, ColorRepository::class);
        $this->app->bind(LogoInterface::class, LogoRepository::class);
        $this->app->bind(IpaddressInterface::class, IpaddressRepository::class);
    }
}
