<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VoucherMailable extends Mailable
{
    use Queueable, SerializesModels;


    protected $order;
    protected $customer_email;
    protected $vouchers;
    protected $paper_size;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($customer_email, $order, $vouchers, $paper_size)
    {
        $this->order = $order;
        $this->customer_email = $customer_email;
        $this->vouchers = $vouchers;
        $this->paper_size = $paper_size;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->to($this->customer_email)
            ->subject('Vaš e-vaučer posebnog poklona - po porudzbini br. '. $this->order->id)
            ->view('emails.voucher.customer_email', ['order' => $this->order, 'customer_email' => $this->customer_email, 'vouchers' => $this->vouchers, 'paper_size' =>  $this->paper_size]);

        foreach ($this->vouchers as $voucher){

            $pdf = $voucher->generatePDF($this->paper_size);

            if($this->paper_size === 'a4'){
                $this->attachData($pdf->setPaper($this->paper_size, 'portrait')->stream(), 'voucher_'.$voucher->voucher_code.'.pdf');
            }
            elseif($this->paper_size === 'a5'){
                $this->attachData($pdf->setPaper($this->paper_size, 'landscape')->stream(), 'voucher_'.$voucher->voucher_code.'.pdf');
            }

        }

        return $this;
    }
}
