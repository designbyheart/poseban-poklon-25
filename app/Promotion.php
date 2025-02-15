<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = ['title', 'is_fixed_price', 'value', 'start_date', 'end_date', 'limit', 'uses_count', 'status'];

    public function product(){
        return $this->belongsTo('App\Product', 'product_id');
    }

    public function category(){
        return $this->belongsTo('App\Category', 'category_id');
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
        if($this->limit > $this->uses_count && $this->status){
            $current_date = Carbon::now();
            if($current_date >= $this->start_date && $current_date <= $this->end_date){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    public static function process($orderItems, $check_price = false){

        $discount = 0;

        foreach($orderItems as $item){

            if($item->product->promotion()->exists() && $item->product->promotion->validate()){

                $promotion = $item->product->promotion;

                $i = 0;

                while($i < $item->product_quantity){

                    if($promotion->validate()){

                        $promotion->is_fixed_price ?
                            $discount += $promotion->value :
                            $discount += $item->product_price * ($promotion->value/100);

                        if(!$check_price){
                            $promotion->recordUsage();
                        }
                    }
                    $i++;
                }
            }
            else{

                $categories = $item->product->categories;

                foreach($categories as $category){

                    if($category->promotion()->exists() && $category->promotion->validate()){

                        $promotion = $category->promotion;

                        $i = 0;

                        while($i < $item->product_quantity){

                            if($promotion->validate()){

                                $promotion->is_fixed_price ?
                                    $discount += $promotion->value :
                                    $discount += $item->product_price * ($promotion->value/100);

                                if(!$check_price){
                                    $promotion->recordUsage();
                                }
                            }
                            $i++;
                        }
                    }
                }
            }
        }
        return $discount;
    }

    /*public static function process($orderItems, $check_price = false){

        $discount = 0;

        foreach($orderItems as $item){

            $item_promotion_discount = 0;

            if($item->product->promotion()->exists() && $item->product->promotion->validate()){

                $promotion = $item->product->promotion;

                $i = 0;

                while($i < $item->product_quantity){

                    if($promotion->validate()){

                        $promotion->is_fixed_price ?
                        $item_promotion_discount += $promotion->value :
                        $item_promotion_discount += $item->product_price * ($promotion->value/100);

                        $discount += $item_promotion_discount;

                        if(!$check_price){
                            $promotion->recordUsage();
                        }
                    }
                    $i++;
                }
            }
            else{

                $categories = $item->product->categories;

                foreach($categories as $category){

                    if($category->promotion()->exists() && $category->promotion->validate()){

                        $promotion = $category->promotion;

                        $i = 0;

                        while($i < $item->product_quantity){

                            if($promotion->validate()){

                                $promotion->is_fixed_price ?
                                $item->promotion_discount += $promotion->value :
                                $item->promotion_discount += $item->product_price * ($promotion->value/100);

                                $discount += $item->promotion_discount;

                                if(!$check_price){
                                    $promotion->recordUsage();
                                }
                            }
                            $i++;
                        }
                    }
                }
            }
            $item->promotion_discount = $item_promotion_discount;
            $item->update();
        }
        return $discount;
    }*/
}
