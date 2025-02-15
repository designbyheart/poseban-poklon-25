<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'content', 'answer_to'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function product(){
        return $this->belongsTo('App\Product');
    }

    public function post(){
        return $this->belongsTo('App\Post');
    }

    // public function protfolioProject(){
    //     return $this->belongsTo('App\PortfolioProject');
    // }

    // public function portfolioItem(){
    //     return $this->belongsTo('App\PortfolioItem');
    // }

    public function answers(){
        return $this->hasMany('App\Comment', 'answer_to');
    }
}
