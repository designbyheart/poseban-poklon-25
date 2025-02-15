<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    protected $fillable = ['name', 'description'];

    public function categories()
    {
        return $this->belongsToMany('App\Category', 'categories_filters')->withTimestamps();
    }

    public function attributes()
    {
        return $this->hasMany('App\Attribute');
    }
}
