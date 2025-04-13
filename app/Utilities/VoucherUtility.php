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

            $templatePath = 'pdfs.voucher'; // Adjust this to your actual template path

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
}
