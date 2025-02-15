<?php

namespace App\Jobs;

use App\Mail\NewOrderUserMailable;
//use Mail;
use App\Mail\VoucherMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;

class SendVoucherEmail implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    protected $customer_email;
    protected $vouchers;
    protected $paper_size;

    /**
     * Create a new job instance.
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
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $customer_email = $this->customer_email;
        $order = $this->order;
        $vouchers = $this->vouchers;
        $paper_size = $this->paper_size;
        Mail::send(new VoucherMailable($customer_email, $order, $vouchers, $paper_size));
    }
}
