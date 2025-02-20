<?php

namespace App\Http\Controllers;

use App\Message;
use App\Services\EmailService;
use Auth;
use App\Dialog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use phpDocumentor\Reflection\DocBlock\Tags\Return_;

class MessageController extends Controller
{

    public function __construct()
    {

        $this->middleware('auth');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $dialog = Dialog::find($request->dialog_id);

        $message = new Message($request->all());
        $message->dialog()->associate($dialog);
        $message->user()->associate($user);

        if ($message->save()) {
            if ($user->role->name != 'admin' || $user->role->name != 'editor') {
                $dialog->status = 1;
                $dialog->update();
            }

            $emails = $dialog->users()->where('user_id', '!=', $user->id)->pluck('email')->toArray();
            $to = array_map(function ($email) {
                return ['email' => $email];
            }, $emails);

            // dd($emails);
            $emailService = new EmailService();
            $emailService->sendEmail('emails.dialog.message', ['content' => $message->content], $to, 'Dialog message');
//            Mail::send('emails.dialog.message', ['content' => $message->content], function($m) use ($emails)
//            {
//                $m->to($emails)->subject('Dialog message');
//            });

            return redirect()->back();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Message $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
