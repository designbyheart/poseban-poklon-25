<?php

namespace App\Http\Controllers;

use App\Like;
use App\Product;
use App\ProjectItem;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{

    public function __construct(){

        $this->middleware('auth');

    }

    // Products
    
    public function likeProduct(Request $request, Product $product){

        $user_id = Auth::User()->id;

        $user = User::find($user_id);

        $product_like = $product->likes()->where('user_id', $user_id)->first();

        if(empty($product_like)){

            $like = new Like();

            $like->user()->associate($user);

            $like->product()->associate($product);

            if($like->save()){

                $product->like_count += 1;

                if($product->save()){

                    return response()->json('success', 200);

                }

            }

        }

    }

    public function dislikeProduct(Request $request, Product $product){

        $user_id = Auth::User()->id;

        $user = User::find($user_id);

        $product_like = $product->likes()->where('user_id', $user_id)->first();

        if(!empty($product_like)){

            if($product_like->delete()){

                $product_like->user()->dissociate();

                $product_like->product()->dissociate();

                $product->like_count -= 1;

                if($product->save()){

                    return response()->json('success', 200);

                }

            }

        }

    }

    // Project Items
    
    public function likeProjectItem(Request $request, ProjectItem $project_item){

        $user_id = Auth::User()->id;

        $user = User::find($user_id);

        $item_like = $project_item->likes()->where('user_id', $user_id)->first();

        if(empty($item_like)){

            $like = new Like();

            $like->user()->associate($user);

            $like->projectItem()->associate($project_item);

            if($like->save()){

                $project_item->like_count += 1;

                if($project_item->save()){

                    return response()->json('success', 200);

                }

            }

        }

    }

    public function dislikeProjectItem(Request $request, ProjectItem $project_item){

        $user_id = Auth::User()->id;

        $user = User::find($user_id);

        $item_like = $project_item->likes()->where('user_id', $user_id)->first();

        if(!empty($item_like)){

            if($item_like->delete()){

                $item_like->user()->dissociate();

                $item_like->projectItem()->dissociate();

                $project_item->like_count -= 1;

                if($project_item->save()){

                    return response()->json('success', 200);

                }

            }

        }

    }

    // Posts
    
    public function likePost(Request $request, Post $post){

        $user_id = Auth::User()->id;

        $user = User::find($user_id);

        $post_like = $post->likes()->where('user_id', $user_id)->first();

        if(empty($post_like)){

            $like = new Like();

            $like->user()->associate($user);

            $like->post()->associate($post);

            if($like->save()){

                $post->like_count += 1;

                if($post->save()){

                    return response()->json('success', 200);

                }

            }

        }

    }

    public function dislikePost(Request $request, Post $post){

        $user_id = Auth::User()->id;

        $user = User::find($user_id);

        $post_like = $post->likes()->where('user_id', $user_id)->first();

        if(!empty($post_like)){

            if($post_like->delete()){

                $post_like->user()->dissociate();

                $post_like->post()->dissociate();

                $post->like_count -= 1;

                if($post->save()){

                    return response()->json('success', 200);

                }

            }

        }

    }

}
