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
    public static function generateVoucherPDF(Voucher $voucher, $paperSize = 'a4')
    {
        try {
            // Validate paper size
            if (!in_array($paperSize, ['a4', 'a5'])) {
                Log::warning('Invalid paper size specified, defaulting to a4', [
                    'voucher_id' => $voucher->id,
                    'specified_size' => $paperSize
                ]);
                $paperSize = 'a4';
            }

            // Load related data
            $orderItem = $voucher->orderItem;
            if (!$orderItem) {
                Log::error('Cannot generate PDF: Order item not found for voucher', [
                    'voucher_id' => $voucher->id
                ]);
                return null;
            }

            // Eager load product with producent to avoid N+1 queries
            $orderItem->load(['product', 'product.producent', 'product.images']);
            $product = $orderItem->product;
            if (!$product) {
                Log::error('Cannot generate PDF: Product not found for order item', [
                    'voucher_id' => $voucher->id,
                    'order_item_id' => $orderItem->id
                ]);
                return null;
            }

            $company = $product->producent;
            if (!$company) {
                Log::warning('Company not found for product when generating PDF', [
                    'voucher_id' => $voucher->id,
                    'product_id' => $product->id
                ]);
                // Continue anyway as this might not be critical
            }

            // Prepare data for the PDF view
            $data = [
                'title' => 'Voucher ' . $voucher->voucher_code,
                'product_title' => $voucher->title,
                'images' => $product->images,
                'voucher_code' => $voucher->voucher_code,
                'activation_code' => $voucher->activation_code,
                'end_date' => $voucher->end_date,
                'company_name' => $company ? $company->title : 'Unknown',
                'company_phone' => $company ? $company->phone_number : '',
                'description' => $voucher->description,
                'additional_info' => $voucher->additional_info,
                'location' => $voucher->location,
                'weather' => $voucher->weather,
                'time_duration' => $voucher->duration,
                'visitors' => $voucher->visitors,
                'dress_code' => $voucher->dress_code,
                'za_gledaoce' => $voucher->za_gledaoce,
                'personal_message' => $voucher->personal_message,
                'qr_code' => $product->qr_code,
                'order' => $voucher->order
            ];

            // Verify the template exists
            $templatePath = 'admin.voucher.' . $paperSize;

            // Generate the PDF with error handling
            try {
                // Set memory limit higher for PDF generation
                ini_set('memory_limit', '512M');
                
                Log::debug('Generating PDF with template', [
                    'voucher_id' => $voucher->id,
                    'template' => $templatePath
                ]);

                $pdf = PDF::loadView($templatePath, $data);
                
                // Set paper orientation based on size
                if ($paperSize === 'a4') {
                    $pdf->setPaper($paperSize, 'portrait');
                } else if ($paperSize === 'a5') {
                    $pdf->setPaper($paperSize, 'landscape');
                }

                // Test if PDF generation was successful
                if ($pdf) {
                    Log::debug('PDF generated successfully', ['voucher_id' => $voucher->id]);
                    return $pdf;
                } else {
                    Log::error('PDF generation failed - no PDF returned from loadView', [
                        'voucher_id' => $voucher->id
                    ]);
                    return null;
                }
            } catch (Exception $innerException) {
                Log::error('PDF rendering error: ' . $innerException->getMessage(), [
                    'voucher_id' => $voucher->id,
                    'template' => $templatePath,
                    'error' => $innerException->getMessage()
                ]);
                return null;
            }
        } catch (Exception $e) {
            Log::error('Error generating voucher PDF: ' . $e->getMessage(), [
                'voucher_id' => $voucher->id,
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }
}