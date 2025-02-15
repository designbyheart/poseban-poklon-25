<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderStatusChangedMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
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
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        if($this->order->order_status_id == 1){

            return $this->to($this->email)
                ->subject('Status porudžbine br '.$this->order->id.' - Priprema')
                ->view('emails.order.status.message', ['message' => $this->message, 'order' => $this->order]);

        }
        elseif($this->order->order_status_id == 2){

            return $this->to($this->email)
                ->subject('Status porudžbine br '.$this->order->id.' - Još samo malo')
                ->view('emails.order.status.message', ['message' => $this->message, 'order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]);

        }
        elseif($this->order->order_status_id == 3){

            return $this->to($this->email)
                ->subject('Status porudžbine br '.$this->order->id.' - Stiže')
                ->view('emails.order.status.message', ['message' => $this->message, 'order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]);

        }
        elseif($this->order->order_status_id == 4){

            return $this->to($this->email)
                ->subject('Status porudžbine br '.$this->order->id.' - Plaćanje neuspešno')
                ->view('emails.order.status.message', ['message' => $this->message, 'order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]);

        }

    }
}
