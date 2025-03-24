<?php

namespace App\Jobs;

use App\Services\EmailService;
use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;

class SendNewOrderUserEmail implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $orderId;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->orderId = $order->id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $order = Order::find($this->orderId);

        if (!$order) {
            Log::error('Order not found for user email', ['order_id' => $this->orderId]);
            return;
        }

        $emailService = new EmailService();
        $emailService->sendEmail(
            'emails.order.new-order-user',
            ['order' => $order, 'transaction_data' => isset($order->transaction_data) ? json_decode($order->transaction_data) : null],
            [['email' => $order->customer_email]],
            'Vaš poseban poklon - priznanica porudžbine br. ' . $order->id
        );
    }
}
