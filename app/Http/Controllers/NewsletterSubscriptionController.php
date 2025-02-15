<?php

namespace App\Http\Controllers;

use App\NewsletterSubscription;
use App\User;
use Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsletterSubscriptionController extends Controller
{

    public function __construct(){

        $this->middleware('check_role:admin,editor', ['except' => ['store', 'getSubscriptionStatus']]);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return view('admin.newsletter.index');

    }

    /**
     * Get a JSON list of newsletter subscriptions
     *
     * @return \Illuminate\Http\Response
     */
    public function indexData(Request $request)
    {

        $per_page = 20;

        $subscriptions = new NewsletterSubscription();

        if(!empty($request->per_page)){

            $per_page = $request->per_page;

        }

        if(!empty($request->search)){

            $subscriptions = $subscriptions->where('email', 'like', '%'.$request->search.'%');

        }

        if(!empty($request->sort_order)){
            $sort_order = $request->sort_order;
        }

        $subscriptions = $subscriptions->orderBy($request->sort_key, $sort_order);

        $subscriptions = $subscriptions->paginate($per_page);

        return response()->json($subscriptions,  200);

    }

    /**
     * Get the user subscription status
     * @param Request $request
     */
    public function getSubscriptionStatus(){

        $user = Auth::user();

        $status = false;

        if(!empty($user->subscription)){

            $status = true;

        }

        return response()->json(['status' => $status], 200);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        $subscription = new NewsletterSubscription($request->all());

        if(!empty($user)){
            $subscription->user()->associate($user);
        }

        if($subscription->save()){
            return response()->json('success', 200);
        }
    }


    /**
     * Get the user subscription status
     * @param Request $request
     */
    public function removeUserSubscription(){

        $user = Auth::user();

        $subscription = $user->newsletter_subscription;

        if($subscription->delete()){

            return response()->json('success', 200);

        }

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\NewsletterSubscription  $newsletterSubscription
     * @return \Illuminate\Http\Response
     */
    public function destroy($param)
    {

        $newsletterSubscription = NewsletterSubscription::find($param);

        if($newsletterSubscription->delete()){

            return response()->json('success', 200);

        }

    }

    //download csv with user emails data
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

        $list = new NewsletterSubscription();

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
