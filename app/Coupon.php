<?php

namespace App;

use Carbon\Carbon;
use App\Category;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = ['title', 'coupon_code', 'is_percentage', 'value', 'start_date', 'end_date', 'limit', 'uses_count', 'status'];

    public function product(){
        return $this->belongsTo('App\Product', 'product_id');
    }

    public function category(){
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function orders(){
        return $this->belongsToMany('App\Order');
    }

    public function recordUsage(){
        $this->uses_count += 1;
        $this->save();
    }

    public function activate(){
        $this->status = true;
        $this->save();
    }

    public function deactivate(){
        $this->status = false;
        $this->save();
    }

    public function validate(){
        if($this->status){
            if ($this->limit > $this->uses_count) {
                $current_date = Carbon::now();
                if ($current_date >= $this->start_date && $current_date <= $this->end_date) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    public function process($orderItems, $request = null){

        $discount = 0;

        foreach($orderItems as $item){

            $item_coupon_discount = 0;

            $product = Product::find($item->product_id);

            $categories = $product->categories;

            if(!empty($categories)){
                foreach($categories as $category){

                    //do not use coupon if promotion on category is active
                    if($category->promotion()->exists() && $category->promotion->validate()){
                        return $discount;
//                        continue;
                    }
                }
            }

            if(!$product->promotion()->exists() || !$product->promotion->validate()){

                if($this->product()->exists() && $item->product_id === $this->product_id){

                    $i = 0;

                    while($i < $item->product_quantity){

                        if($this->validate()){

                            $this->is_percentage ?
                            $item_coupon_discount += $item->product_price * ($this->value/100) :
                            $item_coupon_discount += $this->value;

                            $discount += $item_coupon_discount;

                            if(!empty($request) && ($request->path() != "coupons/validate") && ($request->path() != "orders/calculate")){

                                $this->recordUsage();

                            }
                        }
                        $i++;
                    }
                    $item->coupon_discount = $item_coupon_discount;
                    $item->update();
                    return $discount;
                }

                elseif($this->category()->exists() && $this->category->products->contains('id', $item->product_id)){

                    $i = 0;

                    while($i < $item->product_quantity){

                        if($this->validate()){

                            $this->is_percentage ?
                            $item_coupon_discount += $item->product_price * ($this->value/100) :
                            $item_coupon_discount += $this->value;

                            // $discount += $item_coupon_discount;

                            if(!empty($request) && ($request->path() != "coupons/validate") && ($request->path() != "orders/calculate")){

                                $this->recordUsage();
                            }
                        }
                        $i++;
                    }
                }

               else{

                    $i = 0;

                    while($i < $item->product_quantity){

                        if($this->validate()){

                            $this->is_percentage ?
                                $item_coupon_discount += $item->product_price * ($this->value/100) :
                                $item_coupon_discount += $this->value;

                            if(!empty($request) && ($request->path() != "coupons/validate") && ($request->path() != "orders/calculate")){

                                $this->recordUsage();
                            }
                        }
                        $i++;
                    }

                }
            }

            $item->coupon_discount = $item_coupon_discount;
            $discount += $item_coupon_discount;
            $item->update();
        }

        return $discount;
    }
}
