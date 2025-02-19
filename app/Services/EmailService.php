<?php

namespace App\Services;

use App\Order;
use App\Utilities\VoucherUtility;
use App\Voucher;
use GuzzleHttp\Client;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\SendSmtpEmail;

class EmailService
{
    protected $apiInstance;

    private $sender = [
        'name' => 'Poseban Poklon',
        'email' => 'kontakt@posebanpoklon.rs'
    ];

    public function __construct()
    {
        // Configure API key authorization
        $config = Configuration::getDefaultConfiguration()
            ->setApiKey('api-key', config('services.brevo.key'));

        // Create API instance
        $this->apiInstance = new TransactionalEmailsApi(
            new Client(),
            $config
        );
    }

    public function sendVoucher(string $orderId)
    {
        try {
            $order = Order::where('id', '=', $orderId)->first();
            $vouchers = Voucher::where('order_id', '=', $orderId)->get();
            $customer_email = $order->customer_email;
            if (isset($order->rec_email)) {
                $customer_email = $order->rec_email;
            }

            $attachments = [];
            foreach ($vouchers as $voucher) {
                $pdf = VoucherUtility::generateVoucherPDF($voucher);
                if ($pdf != null) {
                    // Convert PDF output to base64
                    $attachments[] = [
                        'content' => base64_encode($pdf->output()),
                        'name' => 'voucher_' . $voucher->voucher_code . '.pdf'
                    ];
                }
            }

            $sendSmtpEmail = new SendSmtpEmail([
                'to' => [
                    [
                        'email' => $customer_email,
                        'name' => $order->customer_name ?? 'Customer'
                    ]
                ],
                'sender' => $this->sender,
                // 'templateId' => config('services.brevo.voucher_template_id'), // Make sure to set this in your config
                'htmlContent' => view('emails.voucher.VoucherMailable', ['order' => $order])->render(),

                'params' => [
                    'order_id' => $order->id,
                ],
                'subject' => 'Vaš e-vaučer posebnog poklona - po porudzbini br. ' . $order->id,
                'attachment' => $attachments
            ]);

            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
            \Log::info($result);

            return response()->json('Email was sent successfully!');
        } catch (\Exception $exception) {
            print_r('error sending voucher', $exception->getMessage());
        }
    }

    public function sendEMail(string $template, array $dataParams, array $to, string $subject, array $attachments = [])
    {
        try {
            $emailParams = [
                'to' => $to,
                'sender' => $this->sender,
                // 'templateId' => config('services.brevo.voucher_template_id'), // Make sure to set this in your config
                'htmlContent' => view($template, $dataParams)->render(),
                'params' => $dataParams,
                'subject' => $subject,
            ];
            if (count($attachments) > 0) {
                $emailParams['attachment'] = $attachments;
            }

            $sendSmtpEmail = new SendSmtpEmail($emailParams);

            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
            \Log::info($result);

            return response()->json('Email was sent successfully!');
        } catch (\Exception $exception) {
            print_r('error sending voucher', $exception->getMessage());
        }

    }
}
