<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsletterSubscription extends Model
{
    protected $fillable = ['email'];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
