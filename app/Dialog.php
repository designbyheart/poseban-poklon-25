<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Dialog extends Model
{
    protected $fillable = ['title'];

    public function users()
    {
        return $this->belongsToMany('App\User', 'dialogs_users')->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany('App\Message', 'dialog_id');
    }

    public function opponent()
    {
        return $this->users()->where('user_id', '!=', Auth::user()->id);
    }
}
