<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\UserRole;
use App\Image;
use Response;
use Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin', ['except' => ['profile', 'edit', 'update', 'editSubscription']]);
        $this->middleware('auth', ['only' => ['profile', 'edit', 'update', 'editSubscription']]);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = UserRole::all();
        return view('admin.user.index', compact('roles'));
    }

    /**
    * Send list of users with JSON
     */
    public function indexData(Request $request)
    {
        $users = new User();

        $per_page = $request->per_page ?? 20;

        if(!empty($request->search)){
            $users = $users->where('email', 'like', '%'.$request->search.'%')
                ->orWhere('username', 'like', '%'.$request->search.'%')
                ->orWhere('name', 'like', '%'.$request->search.'%');
        }

        if(!empty($request->sort_key) && !empty($request->sort_order)){
            $users = $users->orderBy($request->sort_key, $request->sort_order);
        }

        $users = $users->with('role:id,name')->paginate($per_page);
        return response()->json($users, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return view('admin.user.show');
    }

    /**
     * Show user's profile page.
     *
     */
    public function profile(User $user)
    {
        return view('auth.profile', compact('user'));
    }

    /**
     * User newsletter subscription control
     */
    public function editSubscription(){

        $user = Auth::User();

        $subscription_status = 'false';

        if(!empty($user->newsletter_subscription)){

            $subscription_status = 'true';

        }

        return view('user.profile.newsletter', compact('user', 'subscription_status'));

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        $user = Auth::user();

        $user = json_encode($user);

        return view('user.profile.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        // Add new image or choose from uploaded
        if(!empty($request->file)){
            $file = $request->file;
            $image = new Image();
            $image->title = $file->getClientOriginalName();
            $image->description = $image->title;
            $image->alt = '';
            $image->user()->associate($user);

            $filename = time() . '.' . $file->getClientOriginalName();

            $file->storeAs('public', 'images/' . $user->name . '/' . $filename);
            $image->url = Storage::url('images/' . $user->name . '/' . $filename);
            $user->avatar = $image->url;
            $image->user()->associate($user);
            $image->save();
        }
        elseif(!empty($request->image_id)){
            $image = Image::find($request->image_id);
            $user->avatar = $image->url;
        }

        if(!empty($request->input('password'))){

            $user->fill([
                'password' => Hash::make($request->password)
            ]);

        }

        if($user->update($request->only(['name', 'email', 'username', 'birthdate', 'city', 'description', 'instagram_url', 'pinterest_url', 'facebook_url', 'phone_number']))){
            return response()->json('success', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if(User::count() > 1 && $user->delete()){
            return response()->json('success', 200);
        }
    }

    /**
     * Change user role
     *
     * @param int $user
     * @param int $role
     */
    public function changeRole(Request $request){
        $user = User::find($request->user);
        $role = UserRole::find($request->role);
        $user->role()->associate($role);

        if($user->update()){
            return response()->json('success', 200);
        }
    }

    /**
     * Change user status
     */
    public function changeStatus(Request $request){
        $user = User::find($request->user);
        $user->status = !$user->status;
        if($user->update())
        {
            return response()->json('success', 200);
        }
    }

    //download csv with users data
    public function download(Request $request){

        $headers = [

            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=users.csv',
            'Expires'             => '0',
            'Pragma'              => 'public'

        ];

        $from = $request->from;
        $to = date('Y-m-d', strtotime($request->to. ' + 1 days'));

        $list = new User();

        if (!empty($from) && !empty($to)){

            $list = $list->where('created_at', '>=', $from)->where('created_at', '<=', $to);

        }

        $list = $list->get()->toArray();

        # add headers for each column in the CSV download

        array_unshift($list, array_keys($list[0]));

        $callback = function() use ($list) {

            $FH = fopen('php://output', 'w');

            foreach ($list as $row) {

                fputcsv($FH, $row);

            }
            fclose($FH);
        };

        return Response::stream($callback, 200, $headers);

    }
}
