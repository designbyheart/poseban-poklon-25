<?php

namespace App\Http\Controllers;

use App\Option;
use Illuminate\Http\Request;

class OptionController extends Controller
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
     * Send list of options with JSON
     */
    public function indexData(Request $request)
    {
        $options = new Option();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $options = $options->where('name', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $options = $options->orderBy($request->sort_key, $request->sort_order);
        }

        $options = $options->with('values')->paginate($per_page);
        return response()->json($options, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $option = Option::find($request->option_id);

        $option->load('values');

        if(!empty($option)){
            return response()->json($option);
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
        $option = new Option($request->all());

        if($option->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Option  $option
     * @return \Illuminate\Http\Response
     */
    public function show(Option $option)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Option  $option
     * @return \Illuminate\Http\Response
     */
    public function edit(Option $option)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Option  $option
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Option $option)
    {
        if($option->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Option  $option
     * @return \Illuminate\Http\Response
     */
    public function destroy(Option $option)
    {
        if($option->delete()){
            return response()->json('success', 200);
        }
    }
}
