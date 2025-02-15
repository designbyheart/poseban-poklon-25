<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use function MongoDB\BSON\toJSON;

class SettingController extends Controller
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
        return view('admin.setting.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        return view('admin.setting.edit', compact('setting'));
    }

    // Get list of settings for index page
    public function indexData(Request $request){

        $settings = new Setting();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $settings = $settings->where('title', 'like', '%' . $request->search . '%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $settings = $settings->orderBy($request->sort_key, $request->sort_order);
        }

        $settings = $settings->paginate($per_page);

        return response()->json($settings, 200);

    }

    /**
     * Get a single item data
     */
    public function getSingleItem(Request $request){

        $setting = Setting::find($request->id);

        if(!empty($setting)){
            return response()->json($setting);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        $setting->content = $request->input('content');

        if($setting->update()){
            return response()->json('success', 200);
        }
    }

    /**
     * Update multiple settings at once
     *
     * @param Request $request
     */
    public function updateMultiple(Request $request){

        $settings = $request->settings;

        foreach ($settings as $settingItem){

            $setting = Setting::find($settingItem['id']);

            if(!empty($setting)){

                $content = $settingItem['content'];

                if(is_array($content)){

                    $content = json_encode($content);

                }

                $setting->content = $content;

                $setting->update();

            }

        }

        return response()->json('success');

    }
}
