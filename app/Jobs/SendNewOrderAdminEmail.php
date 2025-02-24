<?php

namespace App\Jobs;

use App\Mail\NewOrderAdminMailable;
use App\Services\EmailService;
use Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendNewOrderAdminEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
//        Mail::send(new NewOrderAdminMailable($this->order));
        $emailService = new EmailService();
        $emailService->sendEmail(
            'emails.order.new-order-admin',
            [
                'order' => $this->order,
                'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null
            ],
            [['email' => 'kontakt@posebanpoklon.rs']],
            'New order #' . $this->order->id
        );
    }
}
