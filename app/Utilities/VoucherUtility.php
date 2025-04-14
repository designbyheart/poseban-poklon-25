<?php

namespace App\Utilities;

use App\Voucher;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade as PDF;
use \Exception;

set_time_limit(1800);

class VoucherUtility
{
    /**
     * Generate a PDF for a voucher
     *
     * @param Voucher $voucher The voucher to generate a PDF for
     * @param string $paperSize The paper size to use (a4, a5)
     * @return \Barryvdh\DomPDF\PDF|null The generated PDF or null if generation failed
     */
    public static function generateVoucherPDF(Voucher $voucher)
    {
        try {
            // Clear any previous output buffers
            while (ob_get_level()) {
                ob_end_clean();
            }

            // Set memory limit higher for PDF generation
            $originalMemoryLimit = ini_get('memory_limit');
            ini_set('memory_limit', '512M');

            $templatePath = 'admin.voucher.a4';

            $orderItem = $voucher->orderItem->load('product');
            $product = $orderItem->product;

            $data = [
                'voucher' => $voucher,
                'title' => $product->title ?? 'Voucher ' . $voucher->voucher_code,
                'product_title' => $voucher->title,
                'images' => $product->images ?? [],
                'voucher_code' => $voucher->voucher_code,
                'activation_code' => $voucher->activation_code,
                'end_date' => $voucher->end_date,
                'company_name' => $product->producent->title ?? '',
                'company_phone' => $product->producent->phone_number ?? '',
                'description' => $voucher->description,
                'additional_info' => $voucher->additional_info,
                'location' => $voucher->location,
                'weather' => $voucher->weather,
                'time_duration' => $voucher->duration,
                'visitors' => $voucher->visitors,
                'dress_code' => $voucher->dress_code,
                'za_gledaoce' => $voucher->za_gledaoce,
                'personal_message' => $voucher->personal_message,
                'qr_code' => $product->qr_code ?? null
            ];

            Log::debug('Generating PDF with template', [
                'voucher_id' => $voucher->id,
                'template' => $templatePath,
                'data_keys' => array_keys($data)
            ]);

            $pdf = PDF::loadView($templatePath, $data);
            $pdf->setPaper('a4', 'portrait');
            $pdf->setWarnings(false);

                return $pdf;

        } catch (\Exception $e) {
            Log::error('Error in generateVoucherPDF', [
                'voucher_id' => $voucher->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        } finally {
            // Restore original memory limit
            if (isset($originalMemoryLimit)) {
            ini_set('memory_limit', $originalMemoryLimit);
            }
        }
    }

    /**
     * Create and save a new voucher
     *
     * @param \App\Order $order
     * @param \App\OrderItem $orderItem
     * @param int $index Current voucher index
     * @param int $alreadyGenerated Number of previously generated vouchers
     * @param object $personalMessages Array of personal messages
     * @return \App\Voucher|null
     */
    public static function createVoucher($order, $orderItem, $index, $alreadyGenerated, $personalMessages)
    {
        try {
            $product = $orderItem->product;
            $productProperties = json_decode($product->properties);

            $voucher = new Voucher();

            // Generate codes and dates
            $voucher->voucher_code = $voucher->generateVoucherCode();
            $voucher->activation_code = $voucher->generateActivationCode();
            $voucher->end_date = $voucher->generateEndDate();

            // Set relationships
            $voucher->order()->associate($order);
            $voucher->orderItem()->associate($orderItem);

            // Set basic information
            $voucher->title = $product->title;
            $voucher->description = $product->voucher_description;

            // Set personal message
            $messageIndex = $alreadyGenerated > 0 ? $alreadyGenerated : $index;
            $voucher->personal_message = isset($personalMessages[$messageIndex]) ?
                $personalMessages[$messageIndex]->text : '';

            // Set product properties
            $voucher->weather = $productProperties->weather ?? '';
            $voucher->duration = $productProperties->duration ?? '';
            $voucher->location = $productProperties->location ?? '';
            $voucher->visitors = $productProperties->visitors ?? '';
            $voucher->dress_code = $productProperties->dress_code ?? '';
            $voucher->za_gledaoce = $productProperties->za_gledaoce ?? '';
            $voucher->additional_info = $productProperties->additional_info ?? '';

            if ($voucher->save() && $order->customer_email !== 'abramusagency@gmail.com') {
                $voucher->sendCompanyEmail();

                Log::info('Voucher created successfully', [
                    'order_id' => $order->id,
                    'voucher_id' => $voucher->id,
                    'voucher_code' => $voucher->voucher_code
                ]);

                return $voucher;
            }

            return null;

        } catch (\Exception $e) {
            Log::error('Error creating voucher', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return null;
        }
    }
}
