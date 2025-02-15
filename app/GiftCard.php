<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GiftCard extends Model
{
    protected $fillable = ['value', 'status', 'code'];

    public function orders(){
        return $this->belongsToMany('App\Order');
    }

    public function activate(){
        $this->status = true;
        $this->update();
    }

    public function deactivate(){
        $this->status = false;
        $this->update();
    }

    public function validate(){
        if($this->status === 0){
            return true;
        }
    }
}
