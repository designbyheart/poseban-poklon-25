<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    protected $fillable = ['quantity', 'quantity_available'];

    public function stock(){
        return $this->belongsTo('App\Stock');
    }

    public function product(){
        return $this->belongsTo('App\Product');
    }
}
