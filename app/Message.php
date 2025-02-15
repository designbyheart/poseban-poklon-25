<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['content'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function dialog()
    {
        return $this->belongsTo('App\Dialog');
    }
}
