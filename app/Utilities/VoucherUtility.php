<?php

namespace App\Utilities;
use App\Voucher;
use PDF;

class VoucherUtility {
    public static function generateVoucherPDF(Voucher $voucher, $paperSize = 'A4'){
        $order_item = $voucher->orderItem->load('product');
        $company = $order_item->product->producent;

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
