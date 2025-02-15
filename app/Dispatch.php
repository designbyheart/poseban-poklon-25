<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dispatch extends Model
{
    protected $fillable = ['comment'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function order(){
        return $this->belongsTo('App\Order');
    }

    public function approve(){

        $this->completed = 1;

        if($this->update()){
            return true;
        }
    }
}
