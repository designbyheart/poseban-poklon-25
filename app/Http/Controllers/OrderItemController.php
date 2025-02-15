<?php

namespace App\Http\Controllers;

use App\OrderItem;
use App\Order;
use App\Product;
use App\Version;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = Product::find($request->product_id);
        $order = Order::find($request->order_id);
        $orderItem = new OrderItem($request->all());

        $orderItem->product()->associate($product);
        $orderItem->order()->associate($order);

        $orderItem->product_price = $product->price;

        if(!empty($request->versions)){

            foreach($request->verions as $v){

                $version = Version::find($v);

                $version->increase_price ?
                    $orderItem->product_price += $version->price :
                    $orderItem->product_price -= $version->price;
            }

            $orderItem->product_total = $orderItem->product_price * $orderItem['product_quantity'];

            $orderItem->save();
            $orderItem->versions()->sync($request->versions);
        }
        else{
            $orderItem->product_total = $orderItem->product_price * $orderItem['product_quantity'];
            $orderItem->save();
        }

        $order->countPrice();

        return response()->json('success', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    public function show(OrderItem $orderItem)
    {
        return view('user.order.item.show', compact('orderItem'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderItem $orderItem)
    {
        $product = Product::find($orderItem->product_id);
        $order = $orderItem->order;

        $orderItem->fill($request->all());

        $orderItem->product_price = $product->price;

        if(!empty($request->versions)){

            foreach($request->verions as $v){

                $version = Version::find($v);

                $version->increase_price ?
                    $orderItem->product_price += $version->price :
                    $orderItem->product_price -= $version->price;
            }
            $orderItem->versions()->sync($request->versions);
        }

        $orderItem->product_total = $orderItem->product_price * $orderItem['product_quantity'];

        $orderItem->update();

        $order->countPrice();

        return response()->json('success', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\OrderItem  $orderItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderItem $orderItem)
    {
        $order = $orderItem->order;

        if($orderItem->delete())
        {
            $order->countPrice();
            return response()->json('success', 200);
        }
    }
}
