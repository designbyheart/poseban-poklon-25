<?php

namespace App\Http\Controllers;

use App\Jobs\SendContact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function sendContact(Request $request){

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'message' => 'required|string',
        ]);

        SendContact::dispatch($request->all())->delay(now()->addSeconds(3));
        return redirect('/kontaktiraj-nas');
    }

}
