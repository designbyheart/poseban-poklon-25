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

    /**
     * Generate vouchers for all items in an order
     *
     * @param \App\Order $order The order to generate vouchers for
     * @return array Array of generated vouchers
     */
    public function generateVouchersForOrder($order)
    {
        $vouchers = [];
        $alreadyGenerated = 0;

        try {
            Log::info('Generating vouchers for order', ['order_id' => $order->id]);

            // Get personal messages if any
            $personalMessages = json_decode($order->personal_message ?? '[]');

            // Loop through each order item
            foreach ($order->orderItems as $orderItem) {
                $product = $orderItem->product;

                // Skip if product doesn't exist
                if (!$product) {
                    Log::warning('Product not found for order item', ['order_item_id' => $orderItem->id]);
                    continue;
                }

                // Generate the requested quantity of vouchers for this item
                for ($i = 0; $i < $orderItem->quantity; $i++) {
                    $voucher = self::createVoucher($order, $orderItem, $i, $alreadyGenerated, $personalMessages);

                    if ($voucher) {
                        $vouchers[] = $voucher;
                        $alreadyGenerated++;
                    }
                }
            }

            Log::info('Voucher generation completed', [
                'order_id' => $order->id,
                'vouchers_generated' => count($vouchers)
            ]);

            return $vouchers;

        } catch (\Exception $e) {
            Log::error('Error generating vouchers for order', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return $vouchers; // Return any vouchers that were successfully generated
        }
    }

    /**
     * Generate and save a PDF for a voucher
     *
     * @param Voucher $voucher The voucher to generate a PDF for
     * @return bool True if PDF was successfully generated and saved, false otherwise
     */
    public static function generateAndSaveVoucherPDF(Voucher $voucher)
    {
        try {
            $pdfPath = storage_path("app/vouchers/{$voucher->voucher_code}.pdf");

            // Ensure directory exists
            if (!file_exists(storage_path('app/vouchers'))) {
                mkdir(storage_path('app/vouchers'), 0755, true);
            }

            // Generate PDF
            $pdf = self::generateVoucherPDF($voucher);

            if (!$pdf) {
                Log::error('Failed to generate PDF for voucher', [
                    'voucher_id' => $voucher->id,
                    'voucher_code' => $voucher->voucher_code
                ]);
                return false;
            }

            // Save PDF
            $pdf->save($pdfPath);

            Log::info('Generated and saved PDF for voucher', [
                'voucher_id' => $voucher->id,
                'voucher_code' => $voucher->voucher_code,
                'path' => $pdfPath
            ]);

            return true;

        } catch (\Exception $e) {
            Log::error('Error in generateAndSaveVoucherPDF', [
                'voucher_id' => $voucher->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return false;
        }
    }

    /**
     * Generate and save PDFs for all vouchers in an order
     *
     * @param \App\Order $order The order containing vouchers
     * @return array Results of the PDF generation process
     */
    public static function generateAndSavePDFsForOrder($order)
    {
        $results = [
            'total' => 0,
            'success' => 0,
            'failed' => 0,
            'failures' => []
        ];

        try {
            // Get all vouchers for this order
            $vouchers = $order->vouchers()->get();
            $results['total'] = count($vouchers);

            foreach ($vouchers as $voucher) {
                if (self::generateAndSaveVoucherPDF($voucher)) {
                    $results['success']++;
                } else {
                    $results['failed']++;
                    $results['failures'][] = $voucher->voucher_code;
                }

                // Force garbage collection after each voucher to free memory
                gc_collect_cycles();
            }

            Log::info('PDF generation completed for order', [
                'order_id' => $order->id,
                'total' => $results['total'],
                'success' => $results['success'],
                'failed' => $results['failed']
            ]);

            return $results;

        } catch (\Exception $e) {
            Log::error('Error generating PDFs for order', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            $results['error'] = $e->getMessage();
            return $results;
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
    public static function createVoucherNew($order, $orderItem, $index, $alreadyGenerated, $personalMessages)
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
