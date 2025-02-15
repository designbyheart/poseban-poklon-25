<?php

namespace App\Http\Controllers;

use App\Bundle;
use Illuminate\Http\Request;

class BundleController extends Controller
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
     * Send list of bundles with JSON
     */
    public function indexData(Request $request)
    {
        $bundles = new Bundle();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $bundles = $bundles->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $bundles = $bundles->orderBy($request->sort_key, $request->sort_order);
        }

        $bundles = $bundles->with('values')->paginate($per_page);
        return response()->json($bundles, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $bundle = Bundle::find($request->bundle_id);

        if(!empty($bundle)){

            $bundle->load('values');

            return response()->json($bundle);
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
        $bundle = new Bundle($request->all());

        if($bundle->save()) {
            if(!empty($request->products)){
                $bundle->products()->sync($request->products);
            }
            if(!empty($request->categories))
            {
                $bundle->categories()->sync($request->categories);
            }
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Bundle  $bundle
     * @return \Illuminate\Http\Response
     */
    public function show(Bundle $bundle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Bundle  $bundle
     * @return \Illuminate\Http\Response
     */
    public function edit(Bundle $bundle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Bundle  $bundle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bundle $bundle)
    {
        if($bundle->update($request->all())) {
            if(!empty($request->products)){
                $bundle->products()->sync($request->products);
            }
            if(!empty($request->categories)) {
                $bundle->categories()->sync($request->categories);
            }
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Bundle  $bundle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bundle $bundle)
    {
        if($bundle->delete()){
            return response()->json('success', 200);
        }
    }
}
