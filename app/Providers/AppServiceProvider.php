<?php

namespace App\Providers;

use App\Services\FiscalCashRegister;
use App\Services\FiscalInvoiceService;
use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Bind FiscalInvoiceService to the container
        $this->app->bind(FiscalInvoiceService::class, function ($app) {
            return new FiscalInvoiceService(
                $app->make(FiscalCashRegister::class)
            );
        });

        // Bind FiscalCashRegister as singleton since it's a service
        $this->app->singleton(FiscalCashRegister::class, function ($app) {
            return new FiscalCashRegister();
        });
    }
}
