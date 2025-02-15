<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['title', 'description', 'location'];

    public function items(){
        return $this->hasMany('App\StockItem');
    }

    public function products(){
        return $this->hasManyTrhough('App\Product', 'App\StockItem');
    }
}
