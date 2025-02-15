<?php

namespace App\Http\Controllers;

use App\Dispatch;
use App\Order;
use Illuminate\Http\Request;

class DispatchController extends Controller
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
        $user = Auth::user();

        $dispatch = new Dispatch($request->all());

        $dispatch->user()->associate($user);

        $order = Order::find($request->order_id);

        $dispatch->order()->associate($order);

        if($dispatch->save()){
            return response()->json('success', 200);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Dispatch  $dispatch
     * @return \Illuminate\Http\Response
     */
    public function show(Dispatch $dispatch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Dispatch  $dispatch
     * @return \Illuminate\Http\Response
     */
    public function edit(Dispatch $dispatch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Dispatch  $dispatch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dispatch $dispatch)
    {
        if ($dispatch->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Approve dispatch.
     * Changes information in stock items of a given dispatch about
     * amount of every product available in every stock.
     *
     */

    public function approveDispatch(Request $request){

        if(!empty($request->dispatch_id)){

            $dispatch = Dispatch::find($request->dispath_id);
            $items = $dispatch->items;

            foreach ($items as $item){

                $stock_item = $item->stock_item;

                if($stock_item->quantity >= $item->quantity){

                    $stock_item->quantity -= $item->quantity;

                }
                else{
                    return respsonse()->json('Not enough products in stock for stock item: ' . $stock_item->id);
                }

            }

            //TODO test if update works properly
            foreach ($items as $item){

                $stock_item = $item->stock_item;
                $stock_item->update();

            }

            if($dispatch->approve()){
                return response()->json('success');
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dispatch  $dispatch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dispatch $dispatch)
    {
        if ($dispatch->delete()){
            return response()->json('success', 200);
        }
    }
}
