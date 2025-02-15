<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Product;
use App\ApprovalRequest;
use App\Rate;
use App\Setting;
use Auth;
use App\Producent;
use App\Store;
use App\Category;
use App\Attribute;
use http\Env\Url;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Filter;
use Storage;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(){

        $this->middleware('check_role:admin,editor,shop_editor', ['except' => ['show', 'publicIndexData', 'filterByAttributes']]);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->is('dashboard/products')){
            return view('admin.product.index');
        }
        elseif($request->is('dashboard/shop-editor/products')){
            return view('shop-editor.product.index');
        }
        else{
            return view('user.product.index');
        }
    }

    /**
     * Send list of products with JSON
     */
    public function indexData(Request $request)
    {
        $products = Product::with('children', 'versions');

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $products = $products->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $products = $products->orderBy($request->sort_key, $request->sort_order);
        }

        $products = $products->with('images');

        //convert all prices to selected currency
        $products = convertPrices($request, $products->paginate($per_page));

        return response()->json($products, 200);
    }

    // Get list of products for public index page
    public function publicIndexData(Request $request){

        $products = new Product();
        $per_page = $request->per_page ?? 20;

        $products = $products->where('status', true);

        if(!empty($request->category_id)){

            $currentCategory = Category::find($request->category_id);

            $categories = $currentCategory->getCategoriesList();

            $products = $products->whereHas('categories', function($products) use ($categories){
                $products->whereIn('category_id', $categories->flatten());
            });

        }

        if(!empty($request->category_slug)){

            $currentCategory = Category::where('slug', $request->category_slug)->first();

            $categories = $currentCategory->getCategoriesList();

            $products = $products->whereHas('categories', function($products) use ($categories){
                $products->whereIn('category_id', $categories->flatten());
            });

        }

        if(!empty($request->category_attributes)){

            $attributes = $request->category_attributes;

            foreach ($attributes as $attribute){

                $products = $products->whereHas('attributes', function($products) use ($attribute){
                    $products->where('attribute_id', $attribute);
                });

            }

        }

        if(!empty($request->search)){

            $products = $products->where('title', 'like', '%' . $request->search . '%');

        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $products = $products->orderBy($request->sort_key, $request->sort_order);
        }

        $products = $products->with('images');

        $products = $products->where('product_id', null)->paginate($per_page);

        $products->getCollection()->transform(function ($product, $key){

            //checks if category contains product in relations
            $vip_category = Category::where('slug', 'vip')->whereHas('products', function($q) use ($product){
                $q->where('products_categories.product_id', $product->id);
            })->exists();

            $product->vip = $vip_category;

            $promo_category = Category::where('slug', 'promo')->whereHas('products', function($q) use ($product){
                $q->where('products_categories.product_id', $product->id);
            })->exists();

            $product->promo = $promo_category;

            $new_category = Category::where('slug', 'novi')->whereHas('products', function($q) use ($product){
                $q->where('products_categories.product_id', $product->id);
            })->exists();

            $product->new = $new_category;

            if($product->children()->exists()){
                $product->price = $product->children->min('price');
            }

            if($product->reviews()->exists()){

                $product->reviews_count = $product->reviews->count();

                $product->rating = $product->calculateRating();

            }
            else{

                $product->reviews_count = 0;
                $product->rating = 0;

            }

            if(Auth::check() && Auth::user()->wishlist->products->contains($product)){

                $product->in_wishlist = true;

            }
            else{

                $product->in_wishlist = false;

            }

            //$product->discount_price = $product->getDiscountPrice();

            $product->location = $product->getLocation();

            return $product;

        });

        return response()->json($products, 200);
    }

    /**
     * Get a single product
     */
    public function getSingleProduct(Request $request){

        $product = Product::find($request->product_id);

        $product->load('categories', 'attributes', 'images', 'producent', 'children');

        $product->attributes->load('filter.attributes');

        return response()->json($product);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $categories = Category::where('parent_id', '=', null)->with('allChildren')->get();
        $attributes = Attribute::all();
        $producents = Producent::all();

        if($request->is('dashboard/products/create')){
            return view('admin.product.create', compact('categories', 'attributes', 'producents'));
        }
        elseif($request->is('dashboard/shop-editor/products/create')){
            return view('shop-editor.product.create', compact('categories', 'attributes', 'producents'));
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product($request->all());
        $product->user()->associate(Auth::user());

        if(!empty($request->slug)){
            $product->slug = createSlug($product, $request->slug);
        }
        else{
            $product->slug = createSlug($product, $product->title);;
        }

        if(empty($product->slug)){

            return response()->json('Can not create a unique slug', 500);

        }

        if(!empty($request->producent_id)){
            $producent = Producent::find($request->producent_id);
            $product->producent()->associate($producent);
        }

        if(!empty($request->product_id)){
            $parent = Product::find($request->product_id);
            $product->parent()->associate($parent);
        }

        if(!empty($request->properties)){
            $product->properties = json_encode($request->properties);
        }

        if(!empty($request->za_koga)){
            $product->za_koga = $request->za_koga;
        }

        if($product->save()){

            if(!empty($request->categories)){
                $product->categories()->sync($request->input('categories'));
            }
            if(!empty($request->attributes)){
                $product->attributes()->sync($request->input('attributes'));
            }
            if(!empty($request->images)){
                $product->images()->sync($request->input('images'));
            }

//            $approval_request = new ApprovalRequest(['product_id' => $product->id]);
//            if($approval_request->save()){
//                $approval_request->reviewingStatus();
//            }

            $this->generateQrCode($product);

            return response()->json(['message' => 'success', 'id' => $product->id], 200);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $product = Product::with('stockItems')->where('status', true)->where('slug', $request->slug)->first();

        if(!empty($product)) {

            $product = $product->load('children', 'images');

            if (Auth::check() && Auth::user()->wishlist->products->contains($product)) {

                $product->in_wishlist = true;

            } else {

                $product->in_wishlist = false;

            }

            $category = $product->categories()->first();

            //Add product url to breadcrumbs
            if (!empty($category)) {
                $breadcrumbs = [0 => ['url' => route('products.show', ['slug' => $product->slug]), 'title' => $product->title]];
                $breadcrumbs = collect($category->getBreadcrumbs($breadcrumbs));
            } else {
                $breadcrumbs = [0 => ['url' => route('home'), 'title' => 'Naslovna'], 1 => ['url' => route('categories.index'), 'title' => 'Prodavnica'], 2 => ['url' => route('products.show', ['slug' => $product->slug]), 'title' => $product->title]];
            }

            $reviews_count = $product->reviews()->count();

            $product_rating = $product->calculateRating();

            //$product['discount_price'] = $product->getDiscountPrice();

            $location = $product->getLocation();

            $visitors_number = $product->getVisitorsNumber();

            $properties = json_decode($product->properties, true);

            return view('user.product.show', compact('product', 'properties', 'reviews_count', 'product_rating', 'discount_price', 'location', 'visitors_number', 'breadcrumbs'));

        }
        else{

            return redirect('/');

        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product, Request $request)
    {
        $images = $product->images;
        $categories = Category::where('parent_id', '=', null)->with('allChildren')->get();

        $selected_categories = $product->categories;
        $selected_producent = $product->producent;
        $selected_attributes = $product->attributes;

        if($request->is('dashboard/products/*')){
            return view('admin.product.edit', compact('product', 'images', 'categories', 'selected_categories', 'selected_attributes', 'selected_producent'));
        }
        elseif($request->is('dashboard/shop-editor/products/*')){
            return view('shop-editor.product.edit', compact('product', 'images', 'categories', 'selected_categories', 'selected_attributes', 'selected_producent'));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        if(Product::where('slug', $request->slug)->where('id', '!=', $product->id)->exists()){
            return response()->json('Slug should be unique', 500);
        }

        if(!empty($request->slug) && ($product->slug != $request->slug)){
            $product->slug = createSlug($product, $request->slug);
            $this->generateQrCode($product);
        }
        elseif(empty($request->slug)){
            $product->slug = createSlug($product, $product->title);
        }

        if(empty($product->slug)){

            return response()->json('Can not create a unique slug', 500);

        }

        if(!empty($request->producent_id)){
            $producent = Producent::find($request->producent_id);
            $product->producent()->associate($producent);
        }

        if(!empty($request->product_id)){
            $parent = Product::find($request->product_id);
            $product->parent()->associate($parent);
        }
        elseIf(is_null($request->product_id)){

            $product->parent()->dissociate();

        }

        if(!empty($request->properties)){

            $request['properties'] = json_encode($request->properties);

        }

        $product->za_koga = $request['za_koga'];

        if($product->update($request->all())){

            if(!empty($request->categories)){
                $product->categories()->sync($request->input('categories'));
            }
            if(!empty($request->attributes)){
                $product->attributes()->sync($request->input('attributes'));
            }
            if(!empty($request->input('images'))){
                $product->images()->sync($request->input('images'));
            }
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if($product->delete())
        {
            return response()->json('success', 200);
        }
    }

    /**
     * Find products with the list of attributes id's
     */
    public function filterByAttributes(Request $request)
    {
        $products = Product::with('attributes');

        $attributes = $request->input('attributes');
        foreach($attributes as $attribute){
            $products = $products->whereHas('attributes', function($products) use ($attribute){
                // $products->whereIn('attribute_id', $attributes);
                $products->where('attribute_id', $attribute);
            });
        }
        return response()->json(['products' => $products->paginate(10)], 200);
    }

    //Generate QR with product page url
    public function generateQrCode($product){

        $image = QrCode::size(500)
            ->format('png')
            ->generate(route('products.show', ['slug' => $product->slug]));

        $output_file = 'images/qr_codes/qr_code_' . $product->slug . '.png';

        Storage::disk('public')->put($output_file, $image);

        $product->qr_code = Storage::url($output_file);

        $product->update();
    }
}
