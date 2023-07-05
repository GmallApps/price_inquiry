<?php

namespace App\Providers;

use App\Interfaces\AdInterface;
use App\Interfaces\ColorInterface;

use App\Repositories\AdRepository;
use App\Repositories\ColorRepository;

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
    }
}
