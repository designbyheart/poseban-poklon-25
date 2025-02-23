<?php

namespace App\Http\Controllers;

use App\BuilderLayout;
use App\Filter;
use App\Product;
use App\Setting;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $page = BuilderLayout::where('slug', 'home')->first();
        $page_layout = json_decode($page->content);

        $seo_title = Setting::where('slug', 'home_seo_title')->firstOrFail()->content;
        $seo_description = Setting::where('slug', 'home_seo_description')->firstOrFail()->content;
        $seo_keywords = Setting::where('slug', 'home_seo_keywords')->firstOrFail()->content;

        $locationAttributes = Filter::where('slug', 'location')->with('attributes')->first()->attributes;
        $visitorsAttributes = Filter::where('slug', 'visitors')->with('attributes')->first()->attributes;
        $recommended_products = [];

        return view('home', compact( 'page_layout', 'locationAttributes', 'visitorsAttributes', 'recommended_products', 'seo_title', 'seo_description', 'seo_keywords'));

    }
}
