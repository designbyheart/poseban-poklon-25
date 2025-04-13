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

            $templatePath = 'admin.voucher.a4'; // Uses resources/views/admin/voucher/a4.blade.php

            $data = [
                'voucher' => $voucher,
                // Add other necessary data for the template
            ];

            Log::debug('Generating PDF with template', [
                'voucher_id' => $voucher->id,
                'template' => $templatePath
            ]);

            $pdf = PDF::loadView($templatePath, $data);

            // Optimize PDF settings
            $pdf->setPaper('a4', 'portrait');
            $pdf->setWarnings(false);

            // Test if PDF generation was successful
            if ($pdf) {
                Log::debug('PDF generated successfully', ['voucher_id' => $voucher->id]);
                return $pdf;
            }

            Log::error('PDF generation failed - no PDF returned from loadView', [
                'voucher_id' => $voucher->id
            ]);
            return null;

        } catch (Exception $e) {
            Log::error('Error generating PDF', [
                'voucher_id' => $voucher->id,
                'error' => $e->getMessage()
            ]);
            return null;
        } finally {
            // Restore original memory limit
            ini_set('memory_limit', $originalMemoryLimit);

            // Force garbage collection
            gc_collect_cycles();
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
