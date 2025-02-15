<?php

namespace App\Http\Controllers;

use App\Producent;
use Storage;
use App\UserRole;
use Auth;
use App\Image;
use App\User;
use Illuminate\Http\Request;

class ProducentController extends Controller
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
        if($request->is('dashboard/*')){
            return view('admin.producent.index');
        }
        else{
            return view('user.producent.index');
        }
    }

    /**
        * Send list of producents with JSON
        */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;
        $search = $request->search;
        $producents = new Producent;

        if(!empty($search)){
            $producents = $producents
                ->where('title', 'like', '%'.$search.'%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $producents = $producents->orderBy($request->sort_key, $request->sort_order);
        }

        $producents = $producents->paginate($per_page);

        return response()->json($producents, 200);
    }

    /**
     * Get a single producent
     */
    public function getSingleItem(Request $request){

        $producent = Producent::find($request->id);

        if($producent){

            return response()->json($producent);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.producent.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $producent = new Producent($request->all());
        if(!empty($request->file)){
            $file = $request->file;
            $image = new Image();
            $image->title = $file->getClientOriginalName();
            $image->description = $image->title;
            $image->alt = '';
            $image->user()->associate(Auth::user());

            $filename = time() . '.' . $file->getClientOriginalName();

            $file->storeAs('public', 'images/producents/' . $filename);
            $image->url = Storage::url('images/producents/' . $filename);
            $producent->logo = $image->url;
        }
        elseif(!empty($request->image_id)){
            $image = Image::find($request->image_id);
            $producent->logo = $image->url;
        }
        if($producent->save()){
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producent  $producent
     * @return \Illuminate\Http\Response
     */
    public function show(Producent $producent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Producent  $producent
     * @return \Illuminate\Http\Response
     */
    public function edit(Producent $producent)
    {
        return view('admin.producent.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producent  $producent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producent $producent)
    {
        if(!empty($request->file)){
            $file = $request->file;
            $image = new Image();
            $image->title = $file->getClientOriginalName();
            $image->description = $image->title;
            $image->alt = '';
            $image->user()->associate(Auth::user());

            $filename = time() . '.' . $file->getClientOriginalName();

            $file->storeAs('public', 'images/producents/' . $filename);
            $image->url = Storage::url('images/producents/' . $filename);
            $producent->logo = $image->url;
        }
        elseif(!empty($request->image_id)){
            $image = Image::find($request->image_id);
            $producent->logo = $image->url;
        }
        if($producent->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producent  $producent
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producent $producent)
    {
        if($producent->delete())
        {
            return response()->json('success', 200);
        }
    }
}
