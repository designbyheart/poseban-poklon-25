<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producent extends Model
{
    protected $fillable = ['title', 'description', 'slug', 'phone_number', 'email', 'location'];

    public function products(){
        return $this->hasMany('App\Product');
    }
}
