<?php

namespace App\Http\Controllers;

use App\Product;
use App\Stock;
use App\StockItem;
use Illuminate\Http\Request;

class StockItemController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor');

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
        $stock = Stock::find($request->stock_id);
        $product = Product::find($request->product_id);

        $stockItem = new StockItem($request->all());

        $stockItem->product()->associate($product);
        $stockItem->stock()->associate($stock);

        if($stockItem->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\StockItem  $stockItem
     * @return \Illuminate\Http\Response
     */
    public function show(StockItem $stockItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\StockItem  $stockItem
     * @return \Illuminate\Http\Response
     */
    public function edit(StockItem $stockItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\StockItem  $stockItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockItem $stockItem)
    {
        $stock = Stock::find($request->stock_id);
        $product = Product::find($request->product_id);

        $stockItem->product()->associate($product);
        $stockItem->stock()->associate($stock);

        if($stockItem->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\StockItem  $stockItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockItem $stockItem)
    {
        if($stockItem->delete()){
            return response()->json('success', 200);
        }
    }
}
