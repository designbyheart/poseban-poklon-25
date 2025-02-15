<?php

namespace App\Http\Controllers;

use App\Dialog;
use App\Message;
use Illuminate\Http\Request;
use App\User;
use Auth;

class DialogController extends Controller
{

    public function __construct(){

        $this->middleware('auth');
        
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->is('dashboard/dialogs')){
            return view('admin.dialog.index');
        }
        elseif($request->is('dialogs')){
            return view('user.dialog.index', compact('dialogs'));
        }
    }

    /**
    * Send list of users dialogs with JSON
    */
    public function indexData(Request $request)
    {
        $per_page = $request->per_page ?? 20;

        if(Auth::check()){

            $dialogs = Auth::user()
                ->dialogs()
                ->with('opponent')
                ->paginate($per_page);
                
            return response()->json($dialogs, 200);

        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!empty($request->user_id)){

            $dialog = Auth::user()->dialogs()->whereHas('opponent', function($q) use($request){
                $q->where('user_id', $request->user_id);
            })->first();

            if(!empty($dialog)){

                return response()->json($dialog->id, 200);

            }

            else{

                $user = User::find($request->user_id);
                $dialog = Dialog::create($request->all());
                $dialog->users()->sync(array($user->id, Auth::user()->id));

                if($user->role->name == ('admin' || 'editor')){

                    $users = User::whereHas('role', function($q){
                        $q->where('name', 'admin')->orWhere('name', 'editor');
                    })->get();

                    $dialog->users()->syncWithoutDetaching($users);

                }

                return response()->json($dialog->id, 200);

            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Dialog  $dialog
     * @return \Illuminate\Http\Response
     */
    public function show(Dialog $dialog)
    {
        $user = Auth::user();

        if($dialog->users->contains('id', $user->id)){

            if($user->role->name == 'admin' || $user->role->name == 'editor'){

                $dialog->status = 0;
                $dialog->update();

            }

            return view('user.dialog.show', compact('dialog'));
        }
        else{

            abort(404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Dialog  $dialog
     * @return \Illuminate\Http\Response
     */
    public function edit(Dialog $dialog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Dialog  $dialog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dialog $dialog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dialog  $dialog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dialog $dialog)
    {
        //
    }
}
