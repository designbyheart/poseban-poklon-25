<?php

namespace App\Http\Controllers;

use App\BuilderLayout;
use Illuminate\Http\Request;

class BuilderLayoutController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor');

    }

    /**
     * Send list of orders with JSON
     */
    public function indexData(Request $request)
    {
        $builderLayouts = new BuilderLayout();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $builderLayouts = $builderLayouts->orderBy($request->sort_key, $request->sort_order);
        }

        if(!empty($request->search)){
            $builderLayouts = $builderLayouts->where('id', 'like', '%' . $request->search . '%')
                ->orWhere('title', 'like', '%' . $request->search . '%')
                ->orWhere('slug', 'like', '%' . $request->search . '%');
        }

        $builderLayouts = $builderLayouts->with('paymentMethod', 'shippingMethod', 'status')->paginate($per_page);

        return response()->json($builderLayouts, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $builderLayout = BuilderLayout::where('slug', $request->slug)->firstOrFail();

        if(!empty($builderLayout)){
            return response()->json($builderLayout);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.builder.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $builderLayout = new BuilderLayout($request->all());

        //TODO add slug generation

        if(!empty($request->slug)){
            $builderLayout->slug = createSlug($builderLayout, $request->slug);
        }
        else{
            $builderLayout->slug = createSlug($builderLayout, $builderLayout->title);;
        }

        if(empty($builderLayout->slug)){

            return response()->json('Can not create a unique slug', 500);

        }

        if($builderLayout->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BuilderLayout  $builderLayout
     * @return \Illuminate\Http\Response
     */
    public function edit($param)
    {
        return view('admin.builder.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BuilderLayout  $builderLayout
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //TODO add slug verification and generating
        $builderLayout = BuilderLayout::where('slug', $request->slug)->first();

        if(BuilderLayout::where('slug', $request->slug)->where('id', '!=', $builderLayout->id)->exists()){

            return response()->json('Slug should be unique', 500);

        }

        if(!empty($request->slug) && ($builderLayout->slug != $request->slug)){
            $builderLayout->slug = createSlug($builderLayout, $request->slug);
        }
        elseif(empty($request->slug)){
            $builderLayout->slug = createSlug($builderLayout, $builderLayout->title);
        }

        if(empty($builderLayout->slug)){

            return response()->json('Can not create a unique slug', 500);

        }

        if(!empty($builderLayout)){

            if($builderLayout->update($request->all())){
                return response()->json('success', 200);
            }

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BuilderLayout  $builderLayout
     * @return \Illuminate\Http\Response
     */
    public function destroy(BuilderLayout $builderLayout)
    {
        if($builderLayout->delete()){
            return response()->json('success', 200);
        }
    }
}
