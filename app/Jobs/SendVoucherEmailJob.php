<?php
namespace App\Jobs;

use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendVoucherEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $orderId;

    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }

    public function handle(EmailService $emailService)
    {
        $this->emailService = new EmailService();
        $emailService->sendVoucher($this->orderId);
    }
}
