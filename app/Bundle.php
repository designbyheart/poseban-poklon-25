<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{
    protected $fillable = ['title', 'description', 'priority', 'status', 'date_start', 'date_end', 'bundle_code'];

    public function products()
    {
        return $this->belongsToMany('App\Product', 'bundles_products')->withTimestamps();
    }

    public function items()
    {
        return $this->hasMany('App\BundleItem');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Category', 'bundles_categories')->withTimestamps();
    }

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'bundles_orders')->withTimestamps();
    }
}
