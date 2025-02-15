<?php

namespace App\Http\Controllers;

use App\OrderStatus;
use Illuminate\Http\Request;

class OrderStatusController extends Controller
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
     * Send list of order statuses with JSON
     */
    public function indexData(Request $request)
    {
        $per_page = 20;

        $statuses = OrderStatus::paginate($per_page);

        return response()->json($statuses, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('order-status.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(OrderStatus::create($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\OrderStatus  $orderStatus
     * @return \Illuminate\Http\Response
     */
    public function edit(OrderStatus $orderStatus)
    {
        return view('order-status.edit', compact('orderStatus'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\OrderStatus  $orderStatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderStatus $orderStatus)
    {
        if($orderStatus->update($request->all())){
            return reponse()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\OrderStatus  $orderStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderStatus $orderStatus)
    {
        if($orderStatus->delete())
        {
            return response()->json('success', 200);
        }
    }
}
