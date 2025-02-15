<?php

namespace App\Http\Controllers;

use App\Image;
use App\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
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
        return view('admin.payment.index');
    }

    /**
     * Send list of payment methods in JSON
     */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;
        $payment_methods = new PaymentMethod();
        $order_by = "created_at";

        if(!empty($request->search)){

            $payment_methods = $payment_methods->where('name', 'like', '%' . $request->search . '%');

        }

        if(!empty($request->sort_order)){
            $sort_order = $request->sort_order;
        }

        $payment_methods = $payment_methods->orderBy($request->sort_key, $sort_order)->paginate($per_page);

        return response()->json($payment_methods, 200);
    }

    /**
     * Send a public list of payment methods in JSON
     */
    public function publicIndexData()
    {

        $order_by = "created_at";

        $payment_methods = PaymentMethod::with('image')->orderBy($order_by, 'desc')->get();

        return response()->json($payment_methods, 200);

    }

    /**
     * Get a single shipping method
     */
    public function getSingleItem(Request $request){

        $payment_method = PaymentMethod::find($request->id);

        if($payment_method){

            $payment_method->load('image');

            return response()->json($payment_method);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.payment.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $paymentMethod = new PaymentMethod($request->all());

        if(!empty($request->image_id)){
            $image = Image::find($request->image_id);
            $paymentMethod->image()->associate($image);
        }

        if($paymentMethod->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function show(PaymentMethod $paymentMethod)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        return view('admin.payment.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        if(!empty($request->image_id)){
            $image = Image::find($request->image_id);
            $paymentMethod->image()->associate($image);
        }

        if($paymentMethod->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PaymentMethod  $paymentMethod
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        if(PaymentMethod::count() > 1 && $paymentMethod->delete()){
            return response()->json('success', 200);
        }
    }
}
