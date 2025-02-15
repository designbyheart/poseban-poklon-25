<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Version extends Model
{
    protected $fillable = ['quantity', 'price', 'increase_price'];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    public function optionValue()
    {
        return $this->belongsTo('App\OptionValue');
    }


}
