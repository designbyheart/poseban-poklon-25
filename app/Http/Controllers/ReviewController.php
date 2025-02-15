<?php

namespace App\Http\Controllers;

use App\Product;
use App\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{

    public function __construct(){

        $this->middleware('auth');

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.review.index');
    }

    /**
     * Send list of reviews with JSON
     */
    public function indexData(Request $request)
    {
        $reviews = new Review();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $reviews = $reviews->where('content', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_order)){
            $reviews = $reviews->orderBy($request->sort_key, $request->sort_order);
        }

        $reviews = $reviews->with('product', 'user')->paginate($per_page);
        return response()->json($reviews, 200);
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
        $review = new Review($request->all());
        $user = Auth::User();

        if(!empty($request->product_id) && !empty($user)){

            $product = Product::find($request->product_id);

            /*if($user->orderItems()->where('product_id', $product->id)->exists()) {

                $review->product()->associate($product);
                $review->user()->associate($user);

                if ($review->save()) {
                    return response()->json('success', 200);
                }
            }*/



            if(!$user->reviews()->where('product_id', $product->id)->exists()){

                $review->product()->associate($product);
                $review->user()->associate($user);

                if ($review->save()) {
                    return response()->json('success', 200);
                }

            }
            else{

                return response()->json('error', 405);

            }

        }
    }

    /**
     * Approve the review
     */
    public function approveReview(Request $request){

        $review = Review::find($request->id);

        $product = $review->product;
        $rating = $product->reviews()->sum('rating') / $product->reviews()->count();
        $product->rating = round($rating, 1);

        if ($product->update()) {

            $review->approve();

            return response()->json('success');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        $user = Auth::user();

        if(!empty($request->product_id)){
            $product = Product::find($request->product_id);
            $review->product()->associate($product);
            $review->user()->associate($user);

            if($review->update($request->all())){
                return response()->json('success', 200);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        if($review->delete()){
            return response()->json('success');
        }
    }
}
