<?php

namespace App\Http\Controllers;

use App\Image;
use Auth;
use App\Store;
use Storage;
use Illuminate\Http\Request;

class ImageController extends Controller
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
        return view('user.image.index');
    }

    /**
    * Send list of user images with JSON
    */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;
        $images = new Image();

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $images = $images->orderBy($request->sort_key, $request->sort_order);
        }

        $images = $images->paginate($per_page);

        foreach ($images as $image) {

            $image['src'] = $image->url;

        }

        return response()->json($images, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        /**
         *  path  /images/{store}/{image}
         */
        $user = Auth::user();
        $files = $request->file('file');
        $images = collect([]);

    	if(!empty($files)){
            foreach($files as $file){
                $image = new Image($request->all());
                $image->title = $file->getClientOriginalName();
                $image->description = 'image';
                $image->alt = 'image';
                $image->user()->associate($user);

                $filename = time() . '.' . $file->getClientOriginalName();

                $file->storeAs('public', 'products/' . $filename);
                $image->url = Storage::url('products/' . $filename);
                if($image->save()){
                    $images->push($image->only('id', 'url'));
                }

            }
            return response()->json($images, 200);

        }

    }


    public function update(Request $request, Image $image){

        if($image->update($request->all())){

            return response()->json('success');

        }

    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        // if(file_exists($image->url)){
            if($image->delete()){
                unlink(public_path() . $image->url);
                return response()->json('success', 200);
            }
        // }
    }
}
