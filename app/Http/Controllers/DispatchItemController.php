<?php

namespace App\Http\Controllers;

use App\Dispatch;
use App\DispatchItem;
use App\StockItem;
use Illuminate\Http\Request;

class DispatchItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dispatchItem = new DispatchItem($request->all());

        $dispatch = Dispatch::find($request->dispatch_id);

        if(!$dispatch->completed){

            $orderItem = OrderItem::find($request->order_item_id);
            $stockItem = StockItem::find($request->stock_item_id);

            $dispatchItem->dispatch()->associate($dispatch);

            if(($orderItem->product_id == $stockItem->product_id) && ($dispatchItem->quantity <= $stockItem->quantity_available)){

                $dispatchItem->order_item()->associate($orderItem);
                $dispatchItem->stock_item()->associate($stockItem);

                if($dispatchItem->save()){

                    $stockItem->quantity_available -= $dispatchItem->quantity;
                    $stockItem->update();

                    return response()->json('success', 200);
                }

            }

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DispatchItem  $dispatchItem
     * @return \Illuminate\Http\Response
     */
    public function show(DispatchItem $dispatchItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DispatchItem  $dispatchItem
     * @return \Illuminate\Http\Response
     */
    public function edit(DispatchItem $dispatchItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DispatchItem  $dispatchItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DispatchItem $dispatchItem)
    {
        if(!$dispatchItem->dispatch->completed){

            if(!empty($request->quantity)){

                $diff = abs($dispatchItem->quantity - $request->quantity);

                if($request->quantity > $dispatchItem->quantity){

                    if($diff <= $dispatchItem->stock_item->quantity_available){
                        $dispatchItem->stock_item->quantity_available -= $diff;
                    }
                    else{
                        return response()->json('Not enough products in stock');
                    }
                }
                else{
                    $dispatchItem->stock_item->quantity_available += $diff;
                }

                $dispatchItem->quantity = $request->quantity;

            }

            if($dispatchItem->update()){
                $dispatchItem->stock_item->update();
                return response()->json('success', 200);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DispatchItem  $dispatchItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(DispatchItem $dispatchItem)
    {
        if(!$dispatchItem->completed){

            $dispatchItem->stock_item->quantity_available += $dispatchItem->quantity;
            $dispatchItem->stock_item->update();

        }
        if($dispatchItem->delete()){
            return response()->json('success', 200);
        }
    }
}
