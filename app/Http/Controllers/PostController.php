<?php

namespace App\Http\Controllers;

use \App\Post;
use App\PostCategory;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
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

        $posts = Post::all();

        if($request->is('dashboard/posts')){
            return view('admin.post.index', compact('posts'));
        }
    }

    // Get list of posts for index page
    public function indexData(Request $request){

        $per_page = $request->per_page ?? 20;
        $posts = Post::with('user')->paginate($per_page);

        if(!empty($request->search)){

            $posts = Post::with('user')->where('title', 'like', '%' . $request->search . '%')->paginate($per_page);

        }

        return response()->json($posts, 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $post_categories = PostCategory::all();
        if($request->is('dashboard/posts/create')){
            return view('admin.post.create', compact('post_categories'));
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
                'slug' => 'unique:posts|regex:/^[\w]+$/'
            ]);
        } catch (ValidationException $e) {

            return response()->json('Error. Slug must be valid and unique', 422);

        }

        $post = new Post($request->all());

        $current_user_id = Auth::user()->id;

        $post->user_id = $current_user_id;

        if($post->save()){

            if(!empty($request->input('image_id'))){

                $post_image = Image::find($request->input('image_id'));
                $post->image()->associate($post_image);
    
            }

            $categories = PostCategory::find($request->input('categories'));

            $post->categories()->attach($categories);

            return response()->json('success', 200);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('user.product.show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post, Request $request)
    {
        $post_categories = $post->categories;
        $all_categories = PostCategory::all();
        
        if($request->is('dashboard/posts/*')){
            return view('admin.post.edit', compact('post', 'post_categories', 'all_categories'));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {

        try {
            $this->validate($request, [
                'slug' => 'unique:posts,slug,'.$post->id.'|regex:/^[\w]+$/'
            ]);
        } catch (ValidationException $e) {

            return response()->json('Error. Slug must be valid and unique', 422);

        }

        if($post->image_id != $request->image_id){

            $post_image = Image::find($request->input('image_id'));
            $post->image()->associate($post_image);

        }

        if($post->update($request->all())){

            $post->categories()->sync($request->input('categories'));

            return response()->json('success', 200);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {

        if($post->delete()){

            $post->categories()->detach();

            return response()->json('success', 200);

        }

    }

}