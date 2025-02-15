<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'image_url', 'slug', 'seo_title', 'seo_description', 'seo_keywords'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function categories(){
        return $this->belongsToMany('App\PostCategory', 'posts_categories', 'post_id', 'category_id')->withTimestamps();
    }

    public function likes(){
        return $this->hasMany('App\Like', 'post_id');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function image(){
        return $this->belongsTo('App\Image', 'image_id');
    }
}
