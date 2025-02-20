<?php

namespace App\Jobs;

use App\Mail\NewOrderUserMailable;
use Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendNewOrderUserEmail implements ShouldQueue
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
//        Mail::send(new NewOrderUserMailable($this->order));
        $emailService = new EmailService();
        $emailService->sendEmail(
            'emails.order.new-order-user',
            ['order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null],
            ['email' => $this->order->email],
            'Vaš poseban poklon - priznanica porudžbine br. ' . $this->order->id
        );
    }
}
