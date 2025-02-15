<?php

namespace App\Http\Controllers;

use App\Product;
use App\Version;
use App\OptionValue;
use Illuminate\Http\Request;

class VersionController extends Controller
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
        $version = new Version($request->all());

        if(!empty($request->product_id) && !empty($request->option_value_id)){
            $product = Product::findOrFail($request->product_id);
            $version->product()->associate($product);

            $optionValue = OptionValue::findOrFail($request->option_value_id);
            $version->optionValue()->associate($optionValue);

            if($version->save()){
                return response()->json('success', 200);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Version  $version
     * @return \Illuminate\Http\Response
     */
    public function show(Version $version)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Version  $version
     * @return \Illuminate\Http\Response
     */
    public function edit(Version $version)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Version  $version
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Version $version)
    {
        if(!empty($request->option_value_id)){
            $optionValue = OptionValue::findOrFail($request->option_value_id);
            $version->optionValue()->associate($optionValue);
        }

        if(!empty($request->product_id)){
            $product = Product::findOrFail($request->product_id);
            $version->product()->associate($product);
        }

        if($version->update()){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Version  $version
     * @return \Illuminate\Http\Response
     */
    public function destroy(Version $version)
    {
        if($version->delete()){
            return response()->json('success', 200);
        }
    }
}
