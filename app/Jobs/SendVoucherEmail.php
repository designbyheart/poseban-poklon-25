<?php

namespace App\Jobs;

use App\Order;
use App\Services\EmailService;
use App\Voucher;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendVoucherEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $orderId;
    protected $retryCount = 0;
    protected $maxRetries = 3;

    /**
     * Create a new job instance.
     *
     * @param int $orderId
     * @return void
     */
    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }

    /**
     * Get the order ID
     *
     * @return int
     */
    public function getOrderId()
    {
        return $this->orderId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
            $order = Order::with(['status', 'items', 'vouchers'])->find($this->orderId);

            if (!$order) {
            Log::error('Order not found for voucher email', ['order_id' => $this->orderId]);
                return;
            }

        // Verify all PDFs exist before sending
        $allPDFsExist = $order->vouchers->every(function ($voucher) {
            $pdfPath = storage_path("app/vouchers/{$voucher->voucher_code}.pdf");
            return file_exists($pdfPath);
        });

        if (!$allPDFsExist) {
            Log::error('Not all PDFs exist for vouchers', ['order_id' => $this->orderId]);
                    return;
                }

        try {
            app(EmailService::class)->sendVoucher($this->orderId);

            // Mark vouchers as sent
            $order->vouchers()->update(['is_sent' => true]);

            Log::info('Voucher email sent successfully', ['order_id' => $this->orderId]);
        } catch (Exception $e) {
            Log::error('Failed to send voucher email', [
                        'order_id' => $this->orderId,
                'error' => $e->getMessage()
                    ]);
            throw $e;
        }
    }
}
