<?php

namespace App\Http\Controllers;

use App\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
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
        if($request->is('dashboard/post_categories')){

            $categories = PostCategory::all();

            return view('admin.post_category.index', compact('categories'));

        }
    }

    // Get list of post_categories for index page
    public function indexData(Request $request){

        $per_page = $request->per_page ?? 20;
        $post_categories = PostCategory::paginate($per_page);

        if(!empty($request->search)){

            $post_categories = PostCategory::where('name', 'like', '%' . $request->search . '%')->paginate($per_page);

        }

        return response()->json($post_categories, 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $categories = PostCategory::all();

        if($request->is('dashboard/post_categories/create')){

            return view('admin.post_category.create', compact('categories'));

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

        try {
            $this->validate($request, [
                'slug' => 'unique:post_categories|regex:/^[\w]+$/'
            ]);
        } catch (ValidationException $e) {

            return response()->json('Error. Slug must be valid and unique', 422);

        }

        $category = new PostCategory($request->all());

        if(!empty($request->input('parent_id'))){

            $parent = PostCategory::find($request->input('parent_id'));

            $category->parent()->associate($parent);

        }

        if($category->save()){

            return response()->json('success', 200);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PostCategory  $postCategory
     * @return \Illuminate\Http\Response
     */
    public function show($param)
    {
        $category = PostCategory::where('id', $param)
            ->orWhere('slug', $param)
            ->firstOrFail();

        if($category){

            return view('post_category.show', compact('category'));

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PostCategory  $postCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(PostCategory $postCategory, Request $request)
    {

        $categories = PostCategory::all();

        if($request->is('dashboard/post_categories/*')){

            return view('admin.post_category.edit', compact('postCategory', 'categories'));

        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PostCategory  $postCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PostCategory $postCategory)
    {

        try {
            $this->validate($request, [
                'slug' => 'unique:post_categories,slug,'.$postCategory->id.'|regex:/^[\w]+$/'
            ]);
        } catch (ValidationException $e) {

            return response()->json('Error. Slug must be valid and unique', 422);

        }

        if($request->input('parent_id') != $postCategory->parent_id){

            $parent = PostCategory::find($request->input('parent_id'));

            $postCategory->parent()->associate($parent);

        }

        if($postCategory->update($request->all())){

            return response()->json('success', 200);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PostCategory  $postCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(PostCategory $postCategory)
    {

        if($postCategory->delete()){

            return response()->json('success', 200);

        }

    }
}
