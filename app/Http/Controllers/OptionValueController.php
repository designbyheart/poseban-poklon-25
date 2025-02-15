<?php

namespace App\Http\Controllers;

use App\OptionValue;
use App\Option;
use App\Image;
use Illuminate\Http\Request;

class OptionValueController extends Controller
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
     * Send list of option values with JSON
     */
    public function indexData(Request $request)
    {
        $option_values = new OptionValue();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $option_values = $option_values->orderBy($request->sort_key, $request->sort_order);
        }

        $option_values = $option_values->paginate($per_page);
        return response()->json($option_values, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $option_value = OptionValue::find($request->option_value_id);

        if(!empty($option_value)){
            return response()->json($option_value);
        }
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
        $option_value = new OptionValue($request->all());

        if(!empty($request->option_id)){
            $option = Option::findOrFail($request->option_id);
            $option_value->option()->associate($option);
        }

        if(!empty($request->image_id)){
            $image = Image::findOrFail($request->image_id);
            $option_value->image()->associate($image);
        }

        if($option_value->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\OptionValue  $optionValue
     * @return \Illuminate\Http\Response
     */
    public function show(OptionValue $optionValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\OptionValue  $optionValue
     * @return \Illuminate\Http\Response
     */
    public function edit(OptionValue $optionValue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\OptionValue  $optionValue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OptionValue $optionValue)
    {
        if(!empty($request->option_id)){
            $option = Option::findOrFail($request->option_id);
            $optionValue->option()->associate($option);
        }

        if(!empty($request->image_id)){
            $image = Image::findOrFail($request->image_id);
            $optionValue->image()->associate($image);
        }

        if($optionValue->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\OptionValue  $optionValue
     * @return \Illuminate\Http\Response
     */
    public function destroy(OptionValue $optionValue)
    {
        if($optionValue->delete()){
            return response()->json('success', 200);
        }
    }
}
