<?php

namespace App\Http\Controllers;

use App\Product;
use App\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{

    public function __construct(){

        $this->middleware('auth');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function show()
    {

        $user = Auth::user();

        $wishlist = $user->wishlist;

        $wishlist->load('products');

        return view('user.profile.wishlist', compact('wishlist'));

    }

    /**
     * Send list of products with JSON
     */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;
        $products = Auth::user()->wishlist()->products()->paginate($per_page);

        return response()->json($products, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wishlist $wishlist)
    {
        if($wishlist->products()->syncWithoutDetaching($request->products)){
            return response()->json('success', 200);
        }
    }

    public function removeFromWishlist(Request $request, Wishlist $wishlist){

        $products = $request->products;

        foreach ($products as $p){

            $product = Product::find($p);

            $wishlist->products()->detach($product);

        }

        return response()->json('success', 200);
    }
}
