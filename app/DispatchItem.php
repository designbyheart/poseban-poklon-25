<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DispatchItem extends Model
{
    protected $fillable = ['quantity', 'comment'];

    public function dispatch(){
        return $this->belongsTo('App\Dispatch');
    }

    public function order_item(){
        return $this->belongsTo('App\OrderItem');
    }

    public function items(){
        return $this->hasMany('App\DispatchItem');
    }

    public function stock_item(){
        return $this->belongsTo('App\StockItem');
    }

}
