<?php

namespace App\Http\Controllers;

use App\Bundle;
use App\BundleItem;
use App\Product;
use Illuminate\Http\Request;

class BundleItemController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor');

    }

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
        $bundleItem = new BundleItem($request->all());

        if(!empty($request->bundle_id)){
            $bundle = Bundle::find($request->bundle_id);
            $bundleItem->bundle()->associate($bundle);
        }
        else{
            return response()->json('Bundle is obligatory for creating item.');
        }

        if(!empty($request->product_id)){
            $product = Product::find($request->product_id);
            $bundleItem->product()->associate($product);

            $bundleItem->price = $product->price * ($request->discount_percentage / 100);
        }
        else{
            return response()->json('Product is obligatory for creating item.');
        }

        if($bundleItem->save()){
            return response()->json('success');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BundleItem  $bundleItem
     * @return \Illuminate\Http\Response
     */
    public function show(BundleItem $bundleItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BundleItem  $bundleItem
     * @return \Illuminate\Http\Response
     */
    public function edit(BundleItem $bundleItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BundleItem  $bundleItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BundleItem $bundleItem)
    {
        if(!empty($request->bundle_id)){
            $bundle = Bundle::find($request->bundle_id);
            $bundleItem->bundle()->associate($bundle);
        }
        else{
            return response()->json('Bundle is obligatory for item.');
        }

        if(!empty($request->product_id)){
            $product = Product::find($request->product_id);
            $bundleItem->product()->associate($product);

            $bundleItem->price = $product->price * ($request->discount_percentage / 100);
        }
        else{
            return response()->json('Product is obligatory for item.');
        }

        if($bundleItem->update($request->all())){
            return response()->json('success');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BundleItem  $bundleItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(BundleItem $bundleItem)
    {
        if($bundleItem->delete()){
            return response()->json('success', 200);
        }
    }
}
