<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invoice extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::orderedUuid();
            }
        });
    }

    protected $fillable = [
        'id',
        'order_id',
        'user_id',
        'email',
        'external_id',
        'response_data',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the order that owns the invoice
     */
    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    /**
     * Get the user that owns the invoice
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
