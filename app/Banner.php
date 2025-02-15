<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = ['title', 'button_link', 'button_text'];

    public function categories()
    {
        return $this->hasMany('App\Category');
    }

    public function image()
    {
        return $this->belongsTo('App\Image', 'image_id');
    }
}
