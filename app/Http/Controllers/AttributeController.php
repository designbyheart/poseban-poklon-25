<?php

namespace App\Http\Controllers;

use App\Filter;
use App\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{


    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => ['indexData']]);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.attribute.index');
    }

    /**
    * Send list of atributes with JSON
    */
    public function indexData(Request $request)
    {
        $attributes = new Attribute();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $attributes = $attributes->where('name', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $attributes = $attributes->orderBy($request->sort_key, $request->sort_order);
        }

        $attributes = $attributes->with('filter')->paginate($per_page);
        return response()->json($attributes, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $attribute = Attribute::find($request->attribute_id);

        if(!empty($attribute)){

            $attribute->load('filter');

            return response()->json($attribute);
        }
    }

     /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.attribute.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $filter = Filter::find($request->filter_id);
        $attribute = new Attribute($request->all());
        $attribute->filter()->associate($filter);
        $attribute->save();
        return response()->json('success', 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit(Attribute $attribute)
    {
        return view('admin.attribute.edit', compact('attribute'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producent  $attribute
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attribute $attribute)
    {
        if(!empty($request->filter_id)){
            $filter = Filter::find($request->filter_id);
            $attribute->filter()->associate($filter);
        }

        if($attribute->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attribute $attribute)
    {
        if($attribute->delete())
        {
            return response()->json('success', 200);
        }
    }
}
