<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'company_price',
        'currency',
        'short_description',
        'voucher_description',
        'za_koga',
        'type',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'view_count',
        'like_count',
        'properties',
        'status'
    ];

    protected $appends = ['discount_price'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function parent()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }

    public function children()
    {
        return $this->hasMany('App\Product');
    }

    public function promotion()
    {
        return $this->hasOne('App\Promotion', 'product_id')->where('status', true)
            ->where('end_date', '>=', Carbon::now());
    }

    public function producent()
    {
        return $this->belongsTo('App\Producent');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Category', 'products_categories')->withTimestamps();
    }

    public function attributes()
    {
        return $this->belongsToMany('App\Attribute', 'products_attributes')->withTimestamps();
    }

    public function images(){
        return $this->belongsToMany('App\Image', 'products_images')->withTimestamps();
    }

    public function likes(){
        return $this->hasMany('\App\Like', 'product_id');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function versions(){
        return $this->hasMany('App\Version');
    }

    public function bundles()
    {
        return $this->belongsToMany('App\Bundle', 'bundles_products')->withTimestamps();
    }

    public function reviews(){
        return $this->hasMany('App\Review');
    }

    public function stockItems(){
        return $this->hasMany('App\StockItem');
    }

    public function orderItems(){
        return $this->hasMany('App\OrderItem');
    }

    //Function to get the product location attribute
    public function getLocation(){

        $location = $this->attributes()->where(function ($query) {
            return $query->whereHas('filter', function($filter){

                $filter->where('slug', 'location');

            });
        })->first();

        if(!empty($location)){

            $location = $location->name;

        }

        return $location;

    }

    //Function to get the product visitors number attribute
    public function getVisitorsNumber(){

        $visitors_number = $this->attributes()->where(function ($query) {
            return $query->whereHas('filter', function($filter){

                $filter->where('slug', 'visitors');

            });
        })->first();

        if(!empty($visitors_number)){

            $visitors_number = $visitors_number->name;

        }

        return $visitors_number;

    }

    //Calculate product rating
    public function calculateRating(){

        $rating = 0;

        if($this->reviews()->exists()) {

            $reviews_count = $this->reviews->count();

            foreach ($this->reviews as $review) {

                $rating += $review->rating;

            }

            $rating = round($rating / $reviews_count);

        }

        return $rating;

    }

    //Get product discount
    public function getDiscountPrice(){

        $discount_price = 0;

        $promotion = $this->promotion;

        if(empty($promotion)){

            foreach ($this->categories as $category){

                $promotion = $category->promotion;

                if(!empty($promotion)){

                    break;

                }

            }

        }

        if(!empty($promotion) && $promotion->validate()){

            if($promotion->is_fixed_price){

                $discount_price = $this->price - $promotion->value;

            }
            else{

                $discount_price = $this->price - ($this->price * ($promotion->value/100));

            }

        }

        return $discount_price;

    }

    //Get product discount
    public function getDiscountPriceAttribute(){

        $discount_price = 0;

        $promotion = $this->promotion;

        if(empty($promotion)){

            foreach ($this->categories as $category){

                $promotion = $category->promotion;

                if(!empty($promotion)){

                    break;

                }

            }

        }

        if(!empty($promotion) && $promotion->validate()){

            if($promotion->is_fixed_price){

                $discount_price = $this->price - $promotion->value;

            }
            else{

                $discount_price = $this->price - ($this->price * ($promotion->value/100));

            }

        }

        return $discount_price;

    }

}
