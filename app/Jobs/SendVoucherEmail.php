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
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            Log::info('Starting voucher email job', ['order_id' => $this->orderId]);

            // Verify order exists
            $order = Order::find($this->orderId);
            if (!$order) {
                Log::error('Order not found in SendVoucherEmail job', ['order_id' => $this->orderId]);
                return;
            }

            // Verify vouchers exist for this order
            $voucherCount = Voucher::where('order_id', $this->orderId)->count();
            if ($voucherCount == 0) {
                Log::error('No vouchers found for order in SendVoucherEmail job', ['order_id' => $this->orderId]);

                // Try to generate vouchers if they don't exist
                $vouchersGenerated = $order->generateVouchers();
                if (!$vouchersGenerated) {
                    Log::error('Failed to generate vouchers in SendVoucherEmail job', ['order_id' => $this->orderId]);
                    return;
                }

                Log::info('Vouchers generated successfully in job', ['order_id' => $this->orderId]);
            } else {
                Log::info('Found existing vouchers', ['order_id' => $this->orderId, 'count' => $voucherCount]);
            }

            // Now send email with vouchers
            $emailService = new EmailService();
            $result = $emailService->sendVoucher($this->orderId);

            if ($result) {
                Log::info('Voucher email sent successfully via job', ['order_id' => $this->orderId]);
            } else {
                Log::error('Failed to send voucher email in job', ['order_id' => $this->orderId]);
            }
        } catch (\Exception $e) {
            Log::error('Exception in SendVoucherEmail job', [
                'order_id' => $this->orderId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
