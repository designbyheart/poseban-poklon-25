<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['rating', 'content'];

    public function product(){
        return $this->belongsTo('App\Product');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function approve(){
        $this->status = true;
        $this->update();
    }
}
