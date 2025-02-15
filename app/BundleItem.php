<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BundleItem extends Model
{
    protected $fillable = ['priority', 'discount_percentage'];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    public function bundle()
    {
        return $this->belongsTo('App\Bundle');
    }
}
