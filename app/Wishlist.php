<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $fillable = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function products(){
        return $this->belongsToMany('App\Product', 'wishlists_products');
    }
}
