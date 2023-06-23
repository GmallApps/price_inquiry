<?php

namespace App\Providers;

use App\Interfaces\AdInterface;

use App\Repositories\AdRepository;

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
    }
}
