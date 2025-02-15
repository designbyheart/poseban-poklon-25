<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        if(Auth::check()){

            if(Auth::user()->status != 1){

                Auth::logout();
                return redirect()->route('dashboard');

            }

            foreach($roles as $role){
                if($request->user()->hasRole($role)) {
                    return $next($request);
                }
            }
        }

        return redirect()->route('home');
    }
}
