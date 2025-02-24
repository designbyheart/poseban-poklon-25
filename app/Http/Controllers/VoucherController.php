<?php

namespace App\Http\Controllers;

use App\Order;
use App\Services\EmailService;
use App\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PDF;

class VoucherController extends Controller
{
    /**
     * @var EmailService
     */
    private $emailService;

    public function __construct()
    {

        $this->middleware('check_role:admin,editor', ['except' => 'printVoucher']);
        $this->emailService = new EmailService();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.voucher.index');
    }

    //Generate a PDF Voucher
    public function generateVouchers(Request $request)
    {

        $order = Order::find($request->order_id);

        if (isset($order)) {
            if ($order->generateVouchers()) {
                return response()->json('success');
            }
        }

        /*$order = Order::find($request->order_id);

        $order_items = $order->items->load('product');

        foreach ($order_items as $item) {

            $order_item = OrderItem::find($item->id);

            $product = $order_item->product;

            $product_count = $order_item->product_quantity;

            $product_properties = json_decode($product->properties);

            $already_generated = $order_item->vouchers->count();

            $vouchers_count = $product_count - $already_generated;

            $personal_messages = json_decode($item->personal_message);

            if($vouchers_count > 0){

                for ($i = 0; $i < $vouchers_count; $i++) {

                    if (!empty($order_item)) {

                        $voucher = new Voucher();

                        $voucher->voucher_code = $voucher->generateVoucherCode();

                        $voucher->activation_code = $voucher->generateActivationCode();

                        $voucher->end_date = $voucher->generateEndDate();

                        $voucher->order()->associate($order);
                        $voucher->orderItem()->associate($order_item);

                        //Set voucher values
                        $voucher->title = $product->title;
                        $voucher->description = $product->voucher_description;

                        if($already_generated > 0){

                            $voucher->personal_message = $personal_messages[$already_generated]->text;

                        }
                        else{

                            $voucher->personal_message = $personal_messages[$i]->text;

                        }

                        //Voucher properties
                        $voucher->weather = $product_properties->weather;
                        $voucher->duration = $product_properties->duration;
                        $voucher->location = $product_properties->location;
                        $voucher->visitors = $product_properties->visitors;
                        $voucher->dress_code = $product_properties->dress_code;
                        if(!empty($product_properties->za_gledaoce)){

                            $voucher->za_gledaoce = $product_properties->za_gledaoce;

                        }
                        $voucher->additional_info = $product_properties->additional_info;

                        if ($voucher->save() && $order->customer_email !== 'abramusagency@gmail.com') {

                            $this->sendCompanyEmail($voucher->id);

                        }

                    }

                }

            }

        }

        return response()->json('success');*/

    }

    /**
     * Send list of vouchers with JSON
     */
    public function indexData(Request $request)
    {
        $vouchers = Voucher::with('orderItem', 'order');

        $per_page = $request->per_page ?? 20;

        if (!empty($request->search)) {
            $vouchers = $vouchers->where('voucher_code', 'like', '%' . $request->search . '%')
                ->orWhere('title', 'like', '%' . $request->search . '%')
                ->orWhere('activation_code', 'like', '%' . $request->search . '%');
        }

        if (!empty($request->sort_key) && !empty($request->sort_order)) {
            $vouchers = $vouchers->orderBy($request->sort_key, $request->sort_order);
        }

        $vouchers = $vouchers->paginate($per_page);

        return response()->json($vouchers, 200);

    }

    /**
     * Get a single pvoucher
     */
    public function getSingleItem(Request $request)
    {

        $voucher = Voucher::find($request->id);

        $voucher->orderItem->load('order');

        return response()->json($voucher);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if ($request->is('/dashboard/vouchers/create')) {
            return view('admin.voucher.create');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Voucher $voucher
     * @return \Illuminate\Http\Response
     */
    public function show(Voucher $voucher)
    {
        $order_item = $voucher->orderItem();

        return view('admin.voucher.show', compact('order_item'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Voucher $voucher
     * @return \Illuminate\Http\Response
     */
    public function edit(Voucher $voucher)
    {
        return view('admin.voucher.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Voucher $voucher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Voucher $voucher)
    {
        if ($voucher->update($request->all())) {

            return response()->json('success', 200);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Voucher $voucher
     * @return \Illuminate\Http\Response
     */
    public function destroy(Voucher $voucher)
    {
        if ($voucher->delete()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Activate voucher using activation code
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function activateVoucher(Request $request)
    {

        $voucher = Voucher::where('activation_code', $request->activation_code)->firstOrFail();

        if (!empty($voucher)) {

            $current_date = Carbon::now()->format('Y-m-d');
            // return response()->json($voucher->end_date);

            if ($current_date <= $voucher->end_date) {

                if ($voucher->activate()) {

                    return response()->json('success', 200);

                }

            }
        }

    }

    /**
     * Deactivate voucher
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deactivateVoucher(Request $request)
    {

        $voucher = Voucher::where('id', $request->id)->firstOrFail();

        if (!empty($voucher)) {

            if ($voucher->deactivate()) {

                return response()->json('success', 200);

            }

        }

    }


    //Send an email with code to the provider company
    public function sendCompanyEmail($voucher_id)
    {
        dd($voucher_id);
        $voucher = Voucher::find($voucher_id);
        $order_item = $voucher->orderItem->load('product');
        $company = $order_item->product->producent;

        $this->emailService->sendEmail('emails.voucher.company_email', [
            'product_title' => $order_item->product->title,
            'voucher_code' => $voucher->voucher_code,
            'voucher_date' => $voucher->end_date
        ],
            [[
                'email' => 'designbyheart@gmail.com', //  $company->email,
                'name' => $company->title
            ]],
            'New voucher for product: ' . $order_item->product->title
        );
//        Mail::send('emails.voucher.company_email', ['product_title' => $order_item->product->title, 'voucher_code' => $voucher->voucher_code, 'voucher_date' => $voucher->end_date], function ($message) use ($company, $order_item){
//            $message->to($company->email, $company->title)->subject('New voucher for product: '.$order_item->product->title);
//        });
    }

    /**
     * Send email with vouchers
     * @param $vouchers
     * @param $email
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendCustomerEmail(Request $request)
    {
        try {
            $order = Order::find($request->order_id)->first();
            $vouchers = $order->vouchers;
            $customer_email = $request->rec_email;
            $paper_size = $request->paper;

            $emailVouchers = [];

            foreach ($vouchers as $voucher) {
                $pdf = $this->generatePDF($voucher, $paper_size);
                $emailVouchers[] = $pdf->output();
            }

            $this->emailService->sendEmail(
                'emails.voucher.customer_email',
                [],
                [
                    [
                        'email' => $customer_email, 'name' => 'Customer Email'
                    ]
                ],
                'Vaš e-vaučer posebnog poklona - po porudzbini br. ' . $order->id,
                $emailVouchers
            );

//        Mail::send('emails.voucher.customer_email', [], function ($message) use ($customer_email, $order, $vouchers, $paper_size) {
//            $message->to($customer_email)->subject('Vaš e-vaučer posebnog poklona - po porudzbini br. ' . $order->id);
//            foreach ($vouchers as $voucher) {
//                $pdf = $this->generatePDF($voucher, $paper_size);
//                $message->attachData($pdf->output(), 'voucher_' . $voucher->voucher_code . '.pdf');
//            }
//        });

            return response()->json('Email was sent sucessfully!');
        } catch (\Exception $e) {
            print_r('Error', $e->getMessage());
        }
    }

    //Resend a voucher
    public function resendVoucher(Request $request)
    {
        $voucher = Voucher::find($request->voucher_id);
        $customer_email = $request->customer_email;
        $paper_size = $request->paper;
        $order = $voucher->order;

        $pdf = $this->generatePDF($voucher, $paper_size);

        if ($paper_size === 'a4') {
            $eVoucher = $pdf->setPaper($paper_size, 'portrait')->stream('voucher_' . $voucher->voucher_code . '.pdf');
        } elseif ($paper_size === 'a5') {
            $eVoucher = $pdf->setPaper($paper_size, 'landscape')->stream('voucher_' . $voucher->voucher_code . '.pdf');
        } else {
            $eVoucher = $pdf->stream('voucher_' . $voucher->voucher_code . '.pdf');
        }

        if (!empty($paper_size)) {
            $this->emailService->sendEmail(
                'emails.voucher.customer_email',
                ['order' => $order],
                [
                    [
                        'email' => $customer_email
                    ]
                ], 'Vaš poseban poklon - priznanica porudžbine br. ' . $order->id,
                [$eVoucher]
            );

//            Mail::send('emails.voucher.customer_email', ['order' => $order], function ($message) use ($voucher, $customer_email, $paper_size, $order) {
//
//                $message->to($customer_email)->subject('Vaš poseban poklon - priznanica porudžbine br. ' . $order->id);
//
//                $pdf = $this->generatePDF($voucher, $paper_size);
//
//                // $message->attachData($pdf->output(), 'voucher_'.$voucher->voucher_code.'.pdf');
//                // $message->attachData($pdf->setPaper($paper_size, 'portrait')->stream(), 'voucher_'.$voucher->voucher_code.'.pdf');
//                // $message->attachData($pdf->stream('vaucer_' . $voucher->voucher_code . '.pdf'));
//                if ($paper_size === 'a4') {
//                    $message->attachData($pdf->setPaper($paper_size, 'portrait')->stream(), 'voucher_' . $voucher->voucher_code . '.pdf');
//                } elseif ($paper_size === 'a5') {
//                    $message->attachData($pdf->setPaper($paper_size, 'landscape')->stream(), 'voucher_' . $voucher->voucher_code . '.pdf');
//                }
//            });

            return response()->json('success');

        }

    }

    //Print a voucher
    public function printVoucher(Request $request, Voucher $voucher)
    {

        $paper_size = $request->paper_size;

        if (!empty($paper_size)) {

            if ($paper_size === 'a4') {

                $pdf = $this->generatePDF($voucher, $paper_size);

                $pdf = $pdf->setPaper($paper_size, 'portrait')->stream('vaucer_' . $voucher->voucher_code . '.pdf');

            } elseif ($paper_size === 'a5') {

                $pdf = $this->generatePDF($voucher, $paper_size);

                $pdf = $pdf->setPaper($paper_size, 'landscape')->stream('vaucer_' . $voucher->voucher_code . '.pdf');

            }

        } else {

            $pdf = $this->generatePDF($voucher, 'a4');

            $pdf = $pdf->setPaper($paper_size, 'portrait')->stream('vaucer_' . $voucher->voucher_code . '.pdf');

        }

        return $pdf;

    }

    //Generate a pdf voucher
    public function generatePDF(Voucher $voucher, $paper_size)
    {

        $order_item = $voucher->orderItem->load('product');
        $company = $order_item->product->producent;

        $data = [
            'title' => 'Voucher ' . $voucher->voucher_code,
            'product_title' => $voucher->title,
            'images' => $order_item->product->images,
            'voucher_code' => $voucher->voucher_code,
            'activation_code' => $voucher->activation_code,
            'end_date' => $voucher->end_date,
            'company_name' => $company->title,
            'company_phone' => $company->phone_number,
            'description' => $voucher->description,
            'additional_info' => $voucher->additional_info,
            'location' => $voucher->location,
            'weather' => $voucher->weather,
            'time_duration' => $voucher->duration,
            'visitors' => $voucher->visitors,
            'dress_code' => $voucher->dress_code,
            'za_gledaoce' => $voucher->za_gledaoce,
            'personal_message' => $voucher->personal_message,
            'qr_code' => $order_item->product->qr_code
        ];

        if (!empty($paper_size)) {

            $pdf = PDF::loadView('admin.voucher.' . $paper_size, $data);

            return $pdf;

        }

    }

}
