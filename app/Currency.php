<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = ['title', 'code'];

    public function rates(){
        return $this->hasMany('App\Rate')->orderBy('rate_date', 'desc');
    }
}
