<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'first_name', 'last_name', 'company', 'address_one', 'address_two', 'city', 'post_code', 'country', 'region'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
