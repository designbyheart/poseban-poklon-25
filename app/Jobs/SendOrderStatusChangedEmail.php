<?php

namespace App\Jobs;

use App\Mail\OrderStatusChangedMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Mail;
use Illuminate\Foundation\Bus\Dispatchable;

class SendOrderStatusChangedEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public $message;
    public $email;
    public $order;


    public function __construct($email, $message, $order)
    {
        $this->message = $message;
        $this->email = $email;
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::send(new OrderStatusChangedMailable($this->email, $this->message, $this->order));
    }
}
