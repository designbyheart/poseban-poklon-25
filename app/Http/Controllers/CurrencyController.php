<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Rate;
use Illuminate\Http\Request;

class CurrencyController extends Controller
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
        return view('admin.currency.index');
    }

    /**
     * Send list of currencies with JSON
     */
    public function indexData(Request $request){

        $currencies = new Currency();

        if(!empty($request->search)){
            $currencies = $currencies->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $currencies = $currencies->orderBy($request->sort_key, $request->sort_order);
        }

        $per_page = $request->per_page ?? 20;
        $currencies = $currencies->paginate($per_page);

        return response()->json($currencies, 200);

    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $currency = Currency::find($request->id);

        if(!empty($currency)){

            $currency = $currency->load('rates');

            return response()->json($currency);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.currency.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:currencies|max:3'
        ]);

        $currency = new Currency($request->all());

        if(!empty($request->rates) && $currency->save()){

            foreach ($request->rates as $rate) {

                $rate = new Rate($rate);

                $rate->currency()->associate($currency);

                $rate->save();
            }

            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Currency  $currency
     * @return \Illuminate\Http\Response
     */
    public function show(Currency $currency)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Currency  $currency
     * @return \Illuminate\Http\Response
     */
    public function edit(Currency $currency)
    {
        return view('admin.currency.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Currency  $currency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Currency $currency)
    {
        if($currency->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Currency  $currency
     * @return \Illuminate\Http\Response
     */
    public function destroy(Currency $currency)
    {
        if(Currency::count() > 1){

            if($currency->rates()->delete() && $currency->delete()){

                return response()->json('success', 200);

            }

        }
    }
}
