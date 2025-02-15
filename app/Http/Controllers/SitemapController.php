<?php

namespace App\Http\Controllers;

use App\Page;
use App\Product;
use App\Category;
use Auth;
use Storage;

class SitemapController extends Controller
{

    public function index(){

        $products = Product::whereNotNull('slug')->where('status', true)->get()->pluck('slug');

        $categories = Category::all()->pluck('slug');

        $pages = Page::where('show_in_menu', true)->get()->pluck('slug');

        return response()->view('sitemap', compact('products', 'categories', 'pages'))->header('Content-Type', 'text/xml');

    }

}