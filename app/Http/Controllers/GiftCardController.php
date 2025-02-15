<?php

namespace App\Http\Controllers;

use App\GiftCard;
use Illuminate\Http\Request;

class GiftCardController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => 'validateGiftCard']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.gift_card.index');
    }

    /**
    * Send list of categories with JSON
    */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;

        $gift_cards = new GiftCard();

        if(!empty($request->search)){

            $gift_cards = $gift_cards->where('code', 'like', '%' . $request->search . '%');

        }

        if(!empty($request->sort_order)){
            $sort_order = $request->sort_order;
        }

        $gift_cards = $gift_cards->orderBy($request->sort_key, $sort_order);

        $gift_cards = $gift_cards->paginate($per_page);

        return response()->json($gift_cards, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $gift_card = GiftCard::find($request->id);

        if(!empty($gift_card)){

            return response()->json($gift_card);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.gift_card.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $giftCard = new GiftCard($request->all());

        if($giftCard->save()){

            return response('success', 200);

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\GiftCard  $giftCard
     * @return \Illuminate\Http\Response
     */
    public function edit(GiftCard $giftCard)
    {
        return view('admin.gift_card.edit');

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GiftCard  $giftCard
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GiftCard $giftCard)
    {
        if($giftCard->update($request->all())){

            return response('success', 200);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GiftCard  $giftCard
     * @return \Illuminate\Http\Response
     */
    public function destroy(GiftCard $giftCard)
    {
        if($giftCard->delete())
        {
            return response()->json('success', 200);
        }
    }

    /**
     * Public giftcard validation
     */
    public function validateGiftCard(Request $request){
        $giftCard = GiftCard::where('code', $request->giftcard_code)->firstOrFail();

        if(!empty($giftCard) && $giftCard->validate()){
            return response()->json(['value' => $giftCard->value], 200);
        }
        else{
            return response()->json(['value' => 0], 200);
        }
    }
}
