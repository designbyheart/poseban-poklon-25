<?php

namespace App\Providers;

use App\Setting;
use Hamcrest\Core\Set;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use App\Dialog;
use Auth;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer(['partials.admin-header', 'partials.system-editor-header'], function($view) {
            $view->with(['unread_dialogs_count' => Dialog::where('status', 1)
                ->whereHas('users', function($q){
                    $q->where('user_id', Auth::user()->id);
                })->count()]);
        });

        View::composer(['layouts.dashboard'], function ($view){

            //Get all global settings and send them to views
            $user = Auth::user();

            if($user != null){

                $user->load('role');

            }

            $site_logo = Setting::where('slug', 'site_logo')->firstOrFail();
            $default_currency = Setting::where('slug', 'default_currency')->firstOrFail();

            $site_logo = json_decode($site_logo->content);

            $applicationParams = new \stdClass();

            $applicationParams->user = $user;
            $applicationParams->siteLogo = $site_logo[0]->url;
            $applicationParams->defaultCurrency = $default_currency->content;

            $view->with(['applicationParams' => $applicationParams]);

        });

        View::composer(['layouts.app'], function ($view){

            //Get all global settings and send them to views
            $user = Auth::user();

            if($user != null){

                $user->load('role', 'addresses', 'wishlist.products.images');

            }

            $site_logo = Setting::where('slug', 'site_logo')->firstOrFail();
            $default_currency = Setting::where('slug', 'default_currency')->firstOrFail();

            $site_logo = json_decode($site_logo->content);

            $applicationParams = new \stdClass();
            $applicationSettings = new \stdClass();

            $applicationParams->user = $user;
            $applicationParams->siteLogo = $site_logo[0]->url;
            $applicationParams->currency = $default_currency->content;
            $applicationParams->csrf = csrf_token();

            //Custom scripts
            $applicationSettings->custom_js = Setting::where('slug', 'custom_js')->firstOrFail()->content;

            //Custom styles
            $applicationSettings->custom_css = Setting::where('slug', 'custom_css')->firstOrFail()->content;

            //Social links
            $applicationParams->fb_url = Setting::where('slug', 'fb_url')->firstOrFail()->content;
            $applicationParams->twitter_url = Setting::where('slug', 'twitter_url')->firstOrFail()->content;
            $applicationParams->instagram_url = Setting::where('slug', 'instagram_url')->firstOrFail()->content;
            $applicationParams->youtube_url = Setting::where('slug', 'youtube_url')->firstOrFail()->content;

            //Contact information
            $applicationParams->contact_phone = Setting::where('slug', 'contact_phone')->firstOrFail()->content;
            $applicationParams->contact_email = Setting::where('slug', 'contact_email')->firstOrFail()->content;

            //Facebook pixel
            $fb_pixel = Setting::where('slug', 'pixel_code')->firstOrFail()->content;

            //Google analytics
            $google_analytics = Setting::where('slug', 'analytics_code')->firstOrFail()->content;

            $view->with(['applicationParams' => $applicationParams, 'fb_pixel' => $fb_pixel, 'google_analytics' => $google_analytics, 'settings' => $applicationSettings]);

        });
    }
}
