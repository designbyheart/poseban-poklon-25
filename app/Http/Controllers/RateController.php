<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Rate;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RateController extends Controller
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
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $rate = Rate::orderBy('rate_date', 'desc')
            ->where('rate_date', '<=', $request->rate_date)
            ->whereHas('currency', function($q) use ($request){
                $q->where('id', $request->currency_id);
        })->firstOrFail();

        if(!empty($rate)){
            return response()->json($rate);
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
        $rate = new Rate($request->all());

        $currency_id = $request->currency_id;

        $date = $rate->rate_date;

        if(!empty($currency_id) && $rate->validateDate($date, $currency_id)){

            $currency = Currency::find($currency_id);
            $rate->currency()->associate($currency);

            if($rate->save()){
                return response()->json('success', 200);
            }
        }
        else{

            //Return error with a message code
            return response()->json(['type' => 'error', 'message_code' => 'errors.rate.invalidDate']);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function show(Rate $rate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function edit(Rate $rate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rate $rate)
    {

        $currency_id = $request->currency_id;

        $rate_date = Carbon::parse($rate->rate_date);

        $date = Carbon::parse($request->rate_date);

        if(!empty($currency_id)){

            if($date->equalTo($rate_date) || $rate->validateDate($date, $currency_id)){

                $currency = Currency::find($currency_id);
                $rate->currency()->associate($currency);

                if($rate->update($request->all())){
                    return response()->json('success', 200);
                }

            }
            else{

                //Return error with a message code
                return response()->json(['type' => 'error', 'message_code' => 'errors.rate.invalidDate']);

            }

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rate  $rate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rate $rate)
    {
        if($rate->delete()){

            return response()->json('success');

        }
    }
}
