<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OptionValue extends Model
{
    protected $fillable =['value'];

    public function option()
    {
        return $this->belongsTo('App\Option');
    }

    public function image()
    {
        return $this->hasOne('App\Image', 'image_id');
    }
}
