<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{

    public function user(){
        return $this->belongsTo('\App\User', 'user_id');
    }
    
    public function product(){
        return $this->belongsTo('\App\Product', 'product_id');
    }

    public function post(){
        return $this->belongsTo('\App\Post', 'post_id');
    }

}
