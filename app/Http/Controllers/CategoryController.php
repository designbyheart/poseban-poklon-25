<?php

namespace App\Http\Controllers;

use App\Category;
use App\Banner;
use App\Filter;
use App\Attribute;
use App\Setting;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function __construct()
    {

        $this->middleware('check_role:admin,editor', ['except' => ['indexData', 'show', 'publicIndex']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $categories = Category::all();

        foreach ($categories as $category){

            $category->properties = '{"priority":0,"visibility":true}';

            $category->save();

        }

        return view('admin.category.index');
    }

    /**
     * Display a public listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function publicIndex()
    {

        $categories = Category::where('parent_id', null)->with('allChildren.banner.image', 'banner.image')->get();

        $seo_title = Setting::where('slug', 'categories_seo_title')->firstOrFail()->content;
        $seo_description = Setting::where('slug', 'categories_seo_description')->firstOrFail()->content;
        $seo_keywords = Setting::where('slug', 'categories_seo_keywords')->firstOrFail()->content;

        return view('user.category.index', compact('categories', 'seo_title', 'seo_description', 'seo_keywords'));
    }

    /**
     * Send list of categories with JSON
     */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;
        $categories = new Category();
        $sort_key = "created_at";
        $sort_order = "desc";

        if (!empty($request->search)) {

            $categories = $categories->where('title', 'like', '%' . $request->search . '%');
        }

        if (!empty($request->sort_key)) {

            $sort_key = $request->sort_key;
        }

        if (!empty($request->sort_order)) {

            $sort_order = $request->sort_order;
        }

        $categories = $categories->orderBy($sort_key, $sort_order)->paginate($per_page);

        return response()->json($categories, 200);
    }

    /**
     * Get a single category
     */
    public function getSingleCategory(Request $request)
    {

        $category = Category::find($request->category_id);

        if ($category) {

            $category->load('parent', 'filters');

            return response()->json($category);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $filters = Filter::all();
        $categories = Category::all();
        $banners = Banner::all();
        return view('admin.category.create', compact('filters', 'categories', $banners));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = new Category($request->all());

        if (!empty($request->slug)) {
            $category->slug = createSlug($category, $request->slug);
        } else {
            $category->slug = createSlug($category, $category->title);;
        }

        if (empty($category->slug)) {

            return response()->json('Can not create a unique slug', 500);
        }

        if (!empty($request->parent_id)) {

            $parent = Category::find($request->parent_id);
            $category->parent()->associate($parent);
        }

        if (!empty($request->banner_id)) {

            $banner = Banner::find($request->banner_id);
            $category->banner()->associate($banner);
        }

        if ($category->save() && !empty($request->filters)) {

            $category->filters()->sync($request->filters);
        }

        if (!empty($request->properties)) {

            // $category->properties = $request->properties;
            $category->properties = json_encode($request->properties);
        }

        return response()->json('success', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $categories = Category::where('parent_id', null)->with('allChildren.banner.image', 'banner.image')->get();
        $category = Category::where('slug', $request->slug)->firstOrFail();
        $category->load('allChildren', 'banner.image');
        $breadcrumbs = collect($category->getBreadcrumbs());

        return view('user.category.show', compact('category', 'breadcrumbs', 'categories'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        $filters = Filter::all();
        $categories = Category::where('id', '!=', $category->id)->get();
        $categories = $categories->keyBy('id');

        if (!empty($category->children)) {
            $categories = $this->removeChildren($categories, $category->children);
        }

        if (!empty($category->parent->id)) {
            $paret_id = $category->parent->id;
        } else {
            $paret_id = 'null';
        }

        $selected_filters = $category->filters->pluck('id');
        return view('admin.category.edit', compact('filters', 'categories', 'category', 'parent_id', 'selected_filters'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        if (Category::where('slug', $request->slug)->where('id', '!=', $category->id)->exists()) {
            return response()->json('Slug should be unique', 500);
        }

        if (!empty($request->slug) && ($category->slug != $request->slug)) {
            $category->slug = createSlug($category, $request->slug);
        } elseif (empty($request->slug)) {
            $category->slug = createSlug($category, $category->title);
        }

        if (empty($category->slug)) {

            return response()->json('Can not create a unique slug', 500);
        }

        if (!empty($request->parent_id)) {

            $parent = Category::find($request->parent_id);
            $category->parent()->associate($parent);
        } elseif ($category->parent()->exists()) {

            $category->parent()->dissociate();
        }

        if (!empty($request->banner_id)) {

            $banner = Banner::find($request->banner_id);
            $category->banner()->associate($banner);
        } elseif ($category->banner()->exists()) {

            $category->banner()->dissociate();
        }


        if ($category->save() && !empty($request->filters)) {

            $category->filters()->sync($request->filters);
        }

        if (!empty($request->properties)) {
            // $category->properties = $request->properties;
            $category->properties = json_encode($request->properties);
        }

        if ($category->update($request->all())) {

            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if ($category->delete()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Get filters with attributes by categories list (without duplicates)
     */

    public function getFilters(Request $request)
    {
        $filters = new Collection;

        foreach ($request->categories as $category) {
            $category = Category::find($category);

            $filters = $filters->merge($category->fitersWithAttributes);
        }
        return response()->json($filters, 200);
    }

    //For Generating Unique Slug Our Custom function
    public function createSlug($title, $id = 0)
    {
        // Normalize the title
        $slug = str_slug($title);
        // Get any that could possibly be related.
        // This cuts the queries down by doing it once.
        $allSlugs = $this->getRelatedSlugs($slug, $id);
        // If we haven't used it before then we are all good.
        if (!$allSlugs->contains('slug', $slug)) {
            return $slug;
        }
        // Just append numbers like a savage until we find not used.
        for ($i = 1; $i <= 50; $i++) {
            $newSlug = $slug . '-' . $i;
            if (!$allSlugs->contains('slug', $newSlug)) {
                return $newSlug;
            }
        }
        // throw new \Exception('Can not create a unique slug');
    }

    protected function getRelatedSlugs($slug, $id = 0)
    {
        return Category::select('slug')->where('slug', 'like', $slug . '%')
            ->where('id', '<>', $id)
            ->get();
    }

    // remove all related to category children from category collection
    private function removeChildren($categories, $children)
    {

        foreach ($children as $child) {

            if (!empty($child->children)) {
                $this->removeChildren($categories, $child->children);
            }

            $categories->forget($child->id);
        }
        return $categories;
    }
}
