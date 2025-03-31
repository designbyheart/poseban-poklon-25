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
        try {
            Log::info('Starting voucher email job', ['order_id' => $this->orderId, 'attempt' => $this->attempts()]);

            // Verify order exists
            $order = Order::find($this->orderId);
            if (!$order) {
                Log::error('Order not found in SendVoucherEmail job', ['order_id' => $this->orderId]);
                return;
            }

            // Don't send vouchers for failed or unpaid orders
            if ($order->status->id !== 2) { // 2 = Paid status
                Log::warning('Attempted to send vouchers for non-paid order', [
                    'order_id' => $this->orderId,
                    'status_id' => $order->status->id
                ]);
                return;
            }

            // Verify vouchers exist for this order
            $vouchers = Voucher::where('order_id', $this->orderId)->get();
            if ($vouchers->isEmpty()) {
                Log::warning('No vouchers found for order in SendVoucherEmail job', ['order_id' => $this->orderId]);

                // Try to generate vouchers if they don't exist
                $vouchersGenerated = $order->generateVouchers();
                if (!$vouchersGenerated) {
                    Log::error('Failed to generate vouchers in SendVoucherEmail job', ['order_id' => $this->orderId]);
                    
                    // Release job for retry with exponential backoff if under max retries
                    if ($this->attempts() < $this->maxRetries) {
                        $delay = pow(2, $this->attempts()) * 60; // 2, 4, 8 minutes
                        $this->release($delay);
                        Log::info('Releasing job for retry', [
                            'order_id' => $this->orderId, 
                            'attempt' => $this->attempts(), 
                            'delay' => $delay
                        ]);
                    }
                    return;
                }

                Log::info('Vouchers generated successfully in job', ['order_id' => $this->orderId]);
                
                // Refresh vouchers collection after generation
                $vouchers = Voucher::where('order_id', $this->orderId)->get();
            }
            
            Log::info('Found vouchers', ['order_id' => $this->orderId, 'count' => $vouchers->count()]);

            // Now send email with vouchers
            $emailService = new EmailService();
            $result = $emailService->sendVoucher($this->orderId);

            if ($result) {
                Log::info('Voucher email sent successfully via job', [
                    'order_id' => $this->orderId,
                    'voucher_count' => $vouchers->count()
                ]);
                
                // Update all vouchers as sent
                foreach ($vouchers as $voucher) {
                    if (!$voucher->is_sent) {
                        $voucher->is_sent = true;
                        $voucher->save();
                    }
                }
            } else {
                Log::error('Failed to send voucher email in job', ['order_id' => $this->orderId]);
                
                // Release for retry if under max retries
                if ($this->attempts() < $this->maxRetries) {
                    $delay = pow(2, $this->attempts()) * 60; // 2, 4, 8 minutes
                    $this->release($delay);
                    Log::info('Releasing email job for retry', [
                        'order_id' => $this->orderId, 
                        'attempt' => $this->attempts(), 
                        'delay' => $delay
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Exception in SendVoucherEmail job', [
                'order_id' => $this->orderId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Release for retry if under max retries
            if ($this->attempts() < $this->maxRetries) {
                $delay = pow(2, $this->attempts()) * 60; // 2, 4, 8 minutes
                $this->release($delay);
            }
        }
    }
}