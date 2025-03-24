<?php

namespace App\Utilities;

use App\Voucher;
use Illuminate\Support\Facades\Log;
use PDF;
use \Exception;

set_time_limit(1800);

class VoucherUtility
{
    public static function generateVoucherPDF(Voucher $voucher, $paperSize = 'a4')
    {
        try {
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

            if (!empty($paperSize)) {
                $pdf = PDF::loadView('admin.voucher.' . $paperSize, $data);
                return $pdf;
            }
        } catch (Exception $e) {
            Log::error('Error generating voucher PDF: ' . $e->getMessage(), [
                'voucher_id' => $voucher->id,
                'exception' => $e
            ]);
            return null;
        }
    }
}
