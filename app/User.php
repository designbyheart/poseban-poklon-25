<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'birthdate',
        'city', 'avatar',
        'description',
        'instagram_url',
        'pinterest_url',
        'facebook_url',
        'phone_number'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function role(){
        return $this->belongsTo('App\UserRole', 'user_role_id');
    }

    public  function  hasRole($role){
        if($this->role->name == $role){
            return true;
        }
    }

    public function wishlist()
    {
        return $this->hasOne('App\Wishlist', 'user_id');
    }

    public function products(){
        return $this->hasMany('App\Product');
    }

    public function images(){
        return $this->hasMany('App\Image');
    }

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function reviews(){
        return $this->hasMany('App\Review');
    }

    public function dialogs()
    {
        return $this->belongsToMany('App\Dialog', 'dialogs_users')->withTimestamps();
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function orderItems()
    {
        return $this->hasManyThrough('App\OrderItem', 'App\Order');
    }

    public function addresses(){
        return $this->hasMany('App\Address', 'user_id');
    }

    public function defaultAddress(){
        return $this->hasOne('App\Address');
    }

    public function newsletter_subscription(){
        return $this->hasOne('App\NewsletterSubscription');
    }
}
