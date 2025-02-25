<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $fillable = ['name', 'description'];

    public function filter()
    {
        return $this->belongsTo('App\Filter');
    }
}
