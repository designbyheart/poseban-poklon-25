<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{

    protected $fillable = ['name', 'description', 'slug', 'seo_title', 'seo_description', 'seo_keywords'];

    public function posts(){

        return $this->belongsToMany('\App\Post', 'posts_categories')->withTimestamps();

    }

    public function parent(){

        return $this->belongsTo('\App\PostCategory', 'parent_id');

    }

    public function children(){

        return $this->hasMany('\App\PostCategory', 'parent_id');

    }
}
