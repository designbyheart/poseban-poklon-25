<?php

namespace App\Http\Controllers;

use App\Image;
use App\ShippingMethod;
use Illuminate\Http\Request;

class ShippingMethodController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => 'publicIndexData']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.shipping.index');
    }

    /**
     * Send list of shipping methods with JSON
     */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;
        $shipping_methods = new ShippingMethod();
        $sort_key = "virtual";
        $sort_order = "desc";

        if(!empty($request->search)){

            $shipping_methods = $shipping_methods->where('name', 'like', '%' . $request->search . '%');

        }

        if(!empty($request->sort_order)){
            $sort_order = $request->sort_order;
        }

        if(!empty($request->sort_key)){

            $sort_key = $request->sort_key;

        }

        $shipping_methods = $shipping_methods->orderBy($sort_key, $sort_order)->paginate($per_page);

        return response()->json($shipping_methods, 200);
    }

    /**
     * Send a public list of shipping methods in JSON
     */
    public function publicIndexData()
    {

        $order_by = "virtual";

        $shipping_methods = ShippingMethod::with('image')->orderBy($order_by, 'desc')->get();

        return response()->json($shipping_methods, 200);

    }

    /**
     * Get a single shipping method
     */
    public function getSingleItem(Request $request){

        $shipping_method = ShippingMethod::find($request->id);

        if($shipping_method){

            $shipping_method->load('image');

            return response()->json($shipping_method);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.shipping.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            $shippingMethod = new ShippingMethod($request->all());

            if(!empty($request->image_id)){
                $image = Image::find($request->image_id);
                $shippingMethod->image()->associate($image);
            }

            if($shippingMethod->save()){
                return response()->json('success', 200);
            }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ShippingMethod  $shippingMethod
     * @return \Illuminate\Http\Response
     */
    public function show(ShippingMethod $shippingMethod)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ShippingMethod  $shippingMethod
     * @return \Illuminate\Http\Response
     */
    public function edit(ShippingMethod $shippingMethod)
    {
        return view('admin.shipping.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ShippingMethod  $shippingMethod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShippingMethod $shippingMethod)
    {
        if(!empty($request->image_id)){
            $image = Image::find($request->image_id);
            $shippingMethod->image()->associate($image);
        }

        if($shippingMethod->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ShippingMethod  $shippingMethod
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShippingMethod $shippingMethod)
    {
        if(ShippingMethod::count() > 1 && $shippingMethod->delete()){
            return response()->json('success', 200);
        }
    }
}
