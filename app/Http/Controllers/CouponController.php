<?php

namespace App\Http\Controllers;

use App\Category;
use App\Coupon;
use App\Product;
use Illuminate\Http\Request;

class CouponController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => 'validateCoupon']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.coupon.index');
    }

    /**
     * Validate Coupon
     */
    public function validateCoupon(Request $request){

        $coupon = Coupon::where('coupon_code', $request->coupon_code)->firstOrFail();

        $cart_path = 'cart.json';

        $discount = $coupon->process(json_decode (json_encode ($request->order_items)), $request);

        if(!empty($coupon)){
            return response()->json(['value' => $discount], 200);
        }

    }

    /**
     * Send list of coupons with JSON
     */
    public function indexData(Request $request)
    {
        $coupons = new Coupon();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $coupons = $coupons->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_order)){
            $sort_order = $request->sort_order;
        }

        $coupons = $coupons->orderBy($request->sort_key, $sort_order);

        $coupons = $coupons->with('product', 'category')->paginate($per_page);
        return response()->json($coupons, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $coupon = Coupon::find($request->id);

        if(!empty($coupon)){

            return response()->json($coupon);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('admin.coupon.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $coupon = new Coupon($request->all());

        if(!empty($request->product_id)){
            $product = Product::find($request->product_id);
            $coupon->product()->associate($product);
        }
        elseif(!empty($request->category_id)){
            $category = Category::find($request->category_id);
            $coupon->category()->associate($category);
        }

        if($coupon->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function show(Coupon $coupon)
    {

        $product = $coupon->product();
        $category = $coupon->category();

        return view('admin.coupon.show', compact('product', 'category'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function edit(Coupon $coupon, Request $request)
    {

        return view('admin.coupon.edit');

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Coupon $coupon)
    {
        if(!empty($request->product_id)){
            $product = Product::find($request->product_id);
            $coupon->product()->associate($product);
        }
        elseif(!empty($request->category_id)){
            $category = Category::find($request->category_id);
            $coupon->category()->associate($category);
        }

        if($coupon->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Coupon  $coupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Coupon $coupon)
    {
        if($coupon->delete()){
            return response()->json('success', 200);
        }
    }
}
