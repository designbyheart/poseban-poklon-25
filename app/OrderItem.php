<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['product_quantity', 'personal_message', 'box_count', 'box_total'];

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id');
    }

    public function vouchers()
    {
        return $this->hasMany('App\Voucher', 'order_item_id');
    }

    public function order(){
        return $this->belongsTo('App\Order', 'order_id');
    }

    public function versions()
    {
        return $this->belongsToMany('App\Version', 'order_items_versions');
    }
}
