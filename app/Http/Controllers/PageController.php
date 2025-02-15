<?php

namespace App\Http\Controllers;

use App\Page;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => ['show', 'contactPage', 'contactCompany', 'publicIndexData']]);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->is('dashboard/pages')) {

            $pages = Page::all();

            return view('admin.page.index', compact('pages'));

        }
    }

    // Get list of pages for index page
    public function indexData(Request $request){

        $pages = new Page();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $pages = $pages->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_order)){
            $sort_order = $request->sort_order;
        }

        $pages = $pages->orderBy($request->sort_key, $sort_order);

        $pages = $pages->paginate($per_page);

        return response()->json($pages, 200);

    }

    // Get list of pages for displaying in sidebar menu
    public function publicIndexData(){

        $pages = new Page();

        $pages = $pages->where('show_in_menu', true);

        $pages = $pages->orderBy('title', 'asc');

        $pages = $pages->get();

        return response()->json($pages, 200);

    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $page = Page::find($request->id);

        if(!empty($page)){

            return response()->json($page);

        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if ($request->is('dashboard/pages/create')) {
            return view('admin.page.create');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

//        try {
//            $this->validate($request, [
//                'slug' => 'unique:pages|regex:/^[\w]+$/'
//            ]);
//        } catch (ValidationException $e) {
//
//            return response()->json('Error. Slug must be valid and unique', 422);
//
//        }

        $page = new Page($request->all());

        if(!empty($request->slug)){
            $page->slug = createSlug($page, $request->slug);
        }
        else{
            $page->slug = createSlug($page, $page->title);;
        }

        if(empty($page->slug)){

            return response()->json('Can not create a unique slug', 500);

        }

        $current_user_id = Auth::user()->id;

        $page->user_id = $current_user_id;

        if ($page->save()) {

            return response()->json('success', 200);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Page $page
     * @return \Illuminate\Http\Response
     */
    public function show($page_slug)
    {

        $page = Page::where('slug', $page_slug)
            ->firstOrFail();

        return view('user.page.show', compact('page'));

    }

    /*
     *Show a contact page
     */
    public function contactPage(){

        return view('user.page.contact');

    }

    /*
     *Show a contact page
     */
    public function contactCompany(){

        return view('user.page.companies');

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Page $page, Request $request)
    {

        if($request->is('dashboard/pages/*')){

            return view('admin.page.edit', compact('page'));

        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {

//        try {
////            $this->validate($request, [
////                'slug' => 'unique:pages,slug,'.$page->id.'|regex:/^[\w]+$/'
////            ]);
////        } catch (ValidationException $e) {
////
////            return response()->json('Error. Slug must be valid and unique', 422);
////
////        }

        if(Page::where('slug', $request->slug)->where('id', '!=', $page->id)->exists()){
            return response()->json('Slug should be unique', 500);
        }

        if(!empty($request->slug) && ($page->slug != $request->slug)){
            $page->slug = createSlug($page, $request->slug);
        }
        elseif(empty($request->slug)){
            $page->slug = createSlug($page, $page->title);
        }

        if(empty($page->slug)){

            return response()->json('Can not create a unique slug', 500);

        }

        $page->update($request->all());

        if($page->save()){

            return response()->json('success', 200);

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {

        if($page->delete()) {

            return response()->json('success', 200);

        }

    }
}
