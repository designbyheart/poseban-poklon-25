<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use App\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor');

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.promotion.index');
    }

    /**
     * Send list of promotions with JSON
     */
    public function indexData(Request $request){

        $promotions = new Promotion();

        if(!empty($request->search)){
            $promotions = $promotions->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $promotions = $promotions->orderBy($request->sort_key, $request->sort_order);
        }

        $per_page = $request->per_page ?? 20;
        $promotions = $promotions->with('product', 'category')->paginate($per_page);

        return response()->json($promotions, 200);

    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $promotion = Promotion::find($request->id);

        if(!empty($promotion)){

            return response()->json($promotion);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('admin.promotion.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $promotion = new Promotion($request->all());

        if(!empty($request->product_id)){

            $product = Product::find($request->product_id);

            if($product->promotion()->exists()){
                return response()->json('Selected product has promotion already!', 405);
            }

            $promotion->product()->associate($product);
        }
        elseif(!empty($request->category_id)){

            $category = Category::find($request->category_id);

            if($category->promotion()->exists()){
                return response()->json('Selected category has promotion already!', 405);
            }

            $promotion->category()->associate($category);
        }

        if($promotion->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function show(Promotion $promotion)
    {
        $product = $promotion->product();
        $category = $promotion->category();

        return view('admin.promotion.show', compact('product', 'category'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function edit(Promotion $promotion, Request $request)
    {
        return view('admin.promotion.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Promotion $promotion)
    {
        if(!empty($request->product_id)){

            $product = Product::find($request->product_id);

            if($product->promotion()->exists() && $product->promotion->product_id !== $request->product_id){
                return response()->json('Selected product has promotion already!', 405);
            }

            $promotion->product()->associate($product);
        }
        elseif(!empty($request->category_id)){

            $category = Category::find($request->category_id);

            if($category->promotion()->exists() && $category->promotion->category_id !== $request->category_id){
                return response()->json('Selected category has promotion already!', 405);
            }

            $promotion->category()->associate($category);
        }

        if($promotion->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Promotion $promotion)
    {
        if($promotion->delete()){
            return response()->json('success', 200);
        }
    }
}
