<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'title', 'description', 'alt', 'url'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function products(){
        return $this->belongsToMany('App\Product', 'products_images')->withTimestamps();
    }

    public function post(){
        return $this->hasMany('App\Post');
    }

    public function banner()
    {
        return $this->hasOne('App\Banner');
    }
}
