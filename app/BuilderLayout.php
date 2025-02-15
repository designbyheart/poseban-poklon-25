<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BuilderLayout extends Model
{
    protected $fillable = ['title', 'content'];

    protected $casts = [
        'content' => 'array'
    ];
}
