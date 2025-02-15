<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use PDF;

class Voucher extends Model
{
    protected $fillable = ['end_date', 'voucher_code', 'activation_code', 'type', 'activated', 'title', 'description', 'additional_info', 'location', 'duration', 'weather', 'visitors', 'dress_code', 'personal_message', 'is_sent'];

    public function order(){
        return $this->belongsTo('App\Order', 'order_id');
    }

    public function orderItem(){
        return $this->belongsTo('App\OrderItem', 'order_item_id');
    }

    public function activate(){
        $this->activated = true;
        if($this->save()){
            return true;
        }
    }

    public function deactivate(){
        $this->activated = false;
        if($this->save()){
            return true;
        }
    }

    protected $permitted_chars ='0123456789ABCDEFGHIJKLMNOPRSTUVZ';

    public function generateVoucherCode(){
        $voucher_code = $this->generate_string($this->permitted_chars, 8);
        $existing_code = Voucher::where('voucher_code', $voucher_code)->first();
        if($existing_code){
            $this->generateVoucherCode();
        }
        else{
            return $voucher_code;
        }
    }

    public function generateActivationCode(){
        $activation_code = $this->generate_string($this->permitted_chars, 8);
        $existing_code = Voucher::where('activation_code', $activation_code)->first();
        if($existing_code){
            $this->generateActivationCode();
        }
        else{
            return $activation_code;
        }
    }

    public function generate_string($input, $strength = 16) {
        $input_length = strlen($input);
        $random_string = '';
        for($i = 0; $i < $strength; $i++) {
            $random_character = $input[mt_rand(0, $input_length - 1)];
            $random_string .= $random_character;
        }

        return $random_string;
    }

    public function generateEndDate(){

        $end_date = Carbon::now()->addYear();

        return $end_date;
    }

    //Send an email with code to the provider company
    public function sendCompanyEmail(){

        $voucher = $this;
        $order_item = $voucher->orderItem->load('product');
        $company = $order_item->product->producent;

        Mail::send('emails.voucher.company_email', ['product_title' => $order_item->product->title, 'voucher_code' => $voucher->voucher_code, 'voucher_date' => $voucher->end_date], function ($message) use ($company, $order_item){

            $message->to($company->email, $company->title)->subject('New voucher for product: '.$order_item->product->title);

        });

    }

    //Generate a pdf voucher
    public function generatePDF($paper_size){

        $order_item = $this->orderItem->load('product');
        $company = $order_item->product->producent;
        $voucher = $this;

        $data = [
            'title' => 'Voucher '.$voucher->voucher_code,
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

        if(!empty($paper_size)){

            $pdf = PDF::loadView('admin.voucher.'.$paper_size, $data);

            return $pdf;

        }

    }
}
