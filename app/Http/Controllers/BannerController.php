<?php

namespace App\Http\Controllers;

use App\Banner;
use Illuminate\Http\Request;
use Auth;
use App\Image;
use Storage;

class BannerController extends Controller
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
        return view('admin.banner.index');
    }

    /**
    * Send list of banners with JSON
    */
    public function indexData(Request $request)
    {
        $banners = new Banner();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $banners = $banners->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $banners = $banners->orderBy($request->sort_key, $request->sort_order);
        }

        $banners = $banners->paginate($per_page);

        return response()->json($banners, 200);
    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $banner = Banner::find($request->id);

        if(!empty($banner)){

            $banner->load('image');

            return response()->json($banner);
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.banner.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $banner = new Banner($request->all());

        $user = Auth::user();

        // Add new image or choose from uploaded
        if(!empty($request->file)){
            // dd($file);
            $file = $request->file;
            $image = new Image();
            $image->title = $file->getClientOriginalName();
            $image->description = $image->title;
            $image->alt = '';
            $image->user()->associate($user);

            $filename = time() . '.' . $file->getClientOriginalName();

            $file->storeAs('public', 'images/' . $user->name . '/' . $filename);
            $image->url = Storage::url('images/' . $user->name . '/' . $filename);
            // $image->banner()->save($banner);

            if(!empty($user->store)){

                $image->store()->associate($user->store);

            }

            $image->save();
            $banner->image()->associate($image);
        }

        elseif(!empty($request->image_id)){

            $image = Image::find($request->image_id);
            // $image->banner()->save($banner);
            $banner->image()->associate($image);

        }

        if($banner->save()){

            return response()->json('success', 200);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function show(Banner $banner)
    {
        return view('admin.banner.show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function edit(Banner $banner)
    {
        return view('admin.banner.edit', compact('banner'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Banner $banner)
    {

        if(!empty($request->image_id)){

            $image = Image::find($request->image_id);

            if(!empty($image)){

                $banner->image()->associate($image);

            }

        }

        if($banner->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Banner $banner)
    {

        if($banner->categories()->exists()){

            foreach($banner->categories as $category){

                $category->banner()->dissociate();
                $category->save();

            }

        }

        if($banner->delete())
        {
            return response()->json('success', 200);
        }
    }
}
