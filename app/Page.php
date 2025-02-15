<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{

    protected $fillable = ['title', 'content', 'seo_title', 'seo_description', 'seo_keywords', 'status', 'show_in_menu'];

    public function author(){
        return $this->belongsTo('\App\User', 'user_id');
    }
}
