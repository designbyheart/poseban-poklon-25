<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    protected $fillable = ['name', 'description', 'cost'];

    public function orders()
    {
        return $this->hasMany('App\Order')->withTimestamps();
    }

    public function image()
    {
        return $this->belongsTo('App\Image', 'image_id');
    }
}
