<?php

use App\Currency;
use App\Rate;
use App\Setting;

//Convert prices in products collection or order, order_items
if (! function_exists('convertPrices')){

    function convertPrices($request, $products = null, $order = null)
    {
        $default_currency_setting = Setting::where('slug', 'default_currency')->first();
        $default_currency = Currency::where('code', $default_currency_setting->content)->first();

        if(!empty($request->currency_code) && ($request->currency_code !== $default_currency->code)){

            $selected_currency = Currency::where('code', $request->currency_code)->first();

            if(!empty($products)) {
                //get latest currency rate
                $rate = $selected_currency->rates()->orderBy('rate_date', 'desc')->first();

                $products->map(function ($product) use ($rate) {
                    $product->price = $product->price * $rate->value;
                    $product->company_price = $product->company_price * $rate->value;
                    return $product;
                });

                return $products;
            }
            elseif(!empty($order)){
                $currency = $order->currency;
                if(!empty($currency)) {

                    //get latest currency rate with closest date to created_at

                    $rate = Rate::orderBy('rate_date', 'desc')->whereHas('currency', function($q) use ($currency){
                        $q->where('id', $currency->id);
                    })->where('rate_date', '<=', $order->created_at)->first();

                    if(empty($rate)){
                        $rate = Rate::orderBy('rate_date', 'asc')->whereHas('currency', function($q) use ($currency){
                            $q->where('id', $currency->id);
                        })->first();
                    }

                    //convert order price values
                    $order->subtotal = $order->subtotal * $rate->value;
                    $order->total = $order->total * $rate->value;
                    $order->discount = $order->discount * $rate->value;

                    $order->items->map(function ($item) use ($rate) {
                        $item->product_price = $item->product_price * $rate->value;
                        $item->product_total = $item->product_total * $rate->value;
                        return $item;
                    });

                    return $order;
                }
                else{
                    return $order;
                }
            }
        }
        else{
            if(!empty($products)) {
                return $products;
            }
            elseif(!empty($order)){
                return $order;
            }
        }
    }

}


//For Generating Unique Slug Our Custom function
if (! function_exists('createSlug')) {
    function createSlug($model, $title, $id = 0) {

        // Normalize the title
        $slug = str_slug($title);

        // Get any that could possibly be related.
        // This cuts the queries down by doing it once.
        $allSlugs = getRelatedSlugs($model, $slug, $id);

        // If we haven't used it before then we are all good.
        if (! $allSlugs->contains('slug', $slug)){
//            dd($slug);
            return $slug;

        }
        // Just append numbers like a savage until we find not used.
        for ($i = 1; $i <= 50; $i++) {
            $newSlug = $slug.'-'.$i;
            if (! $allSlugs->contains('slug', $newSlug)) {
                return $newSlug;
            }
        }

    }
}

if (! function_exists('getRelatedSlugs')){
    function getRelatedSlugs($model, $slug, $id = 0)
    {
        return $model::select('slug')->where('slug', 'like', $slug.'%')
            ->where('id', '<>', $id)
            ->get();
    }
}


