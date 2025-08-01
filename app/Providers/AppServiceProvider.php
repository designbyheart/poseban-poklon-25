<?php

namespace App\Providers;

use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

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

        // Set proper character encoding for database connections
        DB::statement('SET NAMES utf8mb4');
        DB::statement('SET CHARACTER SET utf8mb4');
        DB::statement('SET character_set_connection=utf8mb4');
        DB::statement('SET collation_connection=utf8mb4_unicode_ci');
        DB::statement('SET character_set_results=utf8mb4');
        DB::statement('SET character_set_client=utf8mb4');

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
