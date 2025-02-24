<?php

namespace App\Jobs;

use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Mail;

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
//        Mail::send(new OrderStatusChangedMailable($this->email, $this->message, $this->order));
        $emailService = new EmailService();
        $data = $this->configureData();

        $emailService->sendEmail($data['template'], $data['data'], [['email' => $this->email]], $data['subject']);
    }

    private function configureData()
    {
        switch ($this->order->order_status_id) {
            case 1:
                return [
                    'subject' => 'Status porudžbine br ' . $this->order->id . ' - Priprema',
                    'template' => 'emails.order.status.message',
                    'data' => ['message' => $this->message, 'order' => $this->order]
                ];

            case 2:
                return [
                    'subject' => 'Status porudžbine br ' . $this->order->id . ' - Još samo malo',
                    'template' => 'emails.order.status.message',
                    'data' => ['message' => $this->message, 'order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]
                ];

            case 3:
                return [
                    'subject' => 'Status porudžbine br ' . $this->order->id . ' - Stiže',
                    'template' => 'emails.order.status.message',
                    'data' => ['message' => $this->message, 'order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]
                ];
            case 4:
                return [
                    'subject' => 'Status porudžbine br ' . $this->order->id . ' - Plaćanje neuspešno',
                    'template' => 'emails.order.status.message',
                    'data' => ['message' => $this->message, 'order' => $this->order, 'transaction_data' => isset($this->order->transaction_data) ? json_decode($this->order->transaction_data) : null]
                ];

            default:
                return [
                    'subject' => 'Status porudžbine Greska: ' . $this->order->id,
                    'template' => 'emails.order.status.message',
                    'data' => []
                ];
        }
    }
}
