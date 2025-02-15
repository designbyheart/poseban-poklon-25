<?php

namespace App\Http\Controllers;

use App\Filter;
use Illuminate\Http\Request;

class FilterController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => ['publicIndexData']]);

    }

    public function index(Request $request)
    {
        $filters = Filter::all();
        return view('admin.filter.index', compact('filters'));
    }

    /**
    * Send list of filter with JSON
     */
    public function indexData(Request $request)
    {
        $filters = new Filter();

        $per_page = $request->per_page ?? 1000;

        if(!empty($request->search)){
            $filters = $filters->where('name', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $filters = $filters->orderBy($request->sort_key, $request->sort_order);
        }

        $filters = $filters->with('attributes')->paginate($per_page);
        return response()->json($filters, 200);
    }

    /**
     * Get a single filter
     */
    public function getSingleFilter(Request $request){

        $filter = Filter::find($request->filter_id);

        if($filter){

            $filter->load('attributes');

            return response()->json($filter);

        }

    }

    /*
     * Category page filters list with attributes
     */
    public function publicIndexData(Request $request){

        $filters = new Filter();

        $location = Filter::where('slug', 'location')->first()->load('attributes');

        $visitors_number = Filter::where('slug', 'visitors')->first()->load('attributes');

        $filters['location'] = $location;

        $filters['visitors_number'] = $visitors_number;

        return response()->json($filters);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.filter.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $filter = new Filter($request->all());

        $filter->slug = str_slug($request->name);

        if($filter->save()){

            return response()->json('success', 200);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Filter  $filter
     * @return \Illuminate\Http\Response
     */
    public function show(Filter $filter)
    {
        return view('admin.filter.show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Filter  $filter
     * @return \Illuminate\Http\Response
     */
    public function edit(Filter $filter, Request $request)
    {
        return view('admin.filter.edit', compact('filter'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Filter  $filter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Filter $filter)
    {
        if($filter->update($request->all())){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Filter  $filter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Filter $filter)
    {
        if($filter->delete())
        {
            return response()->json('success', 200);
        }
    }
}
