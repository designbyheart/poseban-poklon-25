<?php

namespace App\Mail;

use App\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewOrderAdminMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->to('kontakt@posebanpoklon.rs')
                    ->subject('New order #'.$this->order->id)
                    ->view('emails.order.new-order-admin', ['order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]);
    }
}
