<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\UserRole;
use App\Wishlist;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */

    protected function redirectTo()
    {
        return url()->previous();
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {

        //get default user role from database
        $user_roles = UserRole::all();
        $default_role = $user_roles->where('name', 'user')->first();

        if(!empty($default_role)){
            $user = new User([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
            $user->user_role_id = $default_role->id;
//            dd($user);
            if($user->save()){

                $user_wishlist = new Wishlist;
                $user_wishlist->user()->associate($user);
                $user_wishlist->save();

                // Send Thank you email.
                /*Mail::send('emails.welcome', $data, function($message) use ($data)
                {
                    $message->from('no-reply@poliszdesign.com', "Poliszdesign");
                    $message->subject("Welcome to poliszdesign");
                    $message->to($data['email']);
                });*/

                return $user;
            }
        }
    }
}
