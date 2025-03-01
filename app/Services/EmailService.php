<?php

namespace App\Services;

use App\Order;
use App\Utilities\VoucherUtility;
use App\Voucher;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
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

    /**
     * @param string $orderId
     * @return \Illuminate\Http\JsonResponse|void
     * @throws \Throwable
     */
    public function sendVoucher($orderId)
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

            $emailData = [
                'to' => [
                    [
                        'email' => $customer_email,
                        'name' => $order->customer_name ?? 'Customer'
                    ]
                ],
                'sender' => $this->sender,
                // 'templateId' => config('services.brevo.voucher_template_id'), // Make sure to set this in your config
                'htmlContent' => view('emails.voucher.customer_email', ['order' => $order])->render(),

                'params' => [
                    'order_id' => $order->id,
                ],
                'subject' => 'Vaš e-vaučer posebnog poklona - po porudzbini br. ' . $order->id,
            ];

            if (count($attachments) > 0) {
                $emailData['attachment'] = $attachments;
            } else {
                Log::error('NO vouchers found, order id: ' . $orderId);
            }

            $sendSmtpEmail = new SendSmtpEmail($emailData);
            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);

            Log::info('Email sent', (array)$result);

            return response()->json('Email was sent successfully!');
        } catch (\Exception $exception) {
            Log::error('error sending voucher' . $exception->getMessage());
        }
    }

    /**
     * @param string $template
     * @param array $dataParams
     * @param array $to
     * @param string $subject
     * @param array $attachments
     * @return \Illuminate\Http\JsonResponse|void
     * @throws \Throwable
     */
    public function sendEmail($template, $dataParams, $to, $subject, $attachments = [])
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
