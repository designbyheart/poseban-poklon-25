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
        try {
            // Configure API key authorization
            $apiKey = config('services.brevo.key');

            // Log API key length for debugging (don't log the actual key for security)
            Log::debug("Initializing Brevo API client with key length: " . (strlen($apiKey) > 0 ? strlen($apiKey) : 'EMPTY'));

            $config = Configuration::getDefaultConfiguration()
                ->setApiKey('api-key', $apiKey);

            // Create API instance
            $this->apiInstance = new TransactionalEmailsApi(
                new Client([
                    'timeout' => 30,
                    'connect_timeout' => 30
                ]),
                $config
            );
        } catch (\Exception $e) {
            Log::error("Failed to initialize Brevo API client: " . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            // Still allow the service to be instantiated, we'll check for apiInstance before using
        }
    }

    /**
     * @param string $orderId
     * @return \Illuminate\Http\JsonResponse|void
     * @throws \Throwable
     */
    public function sendVoucher($orderId)
    {
        try {
            // Check if the API instance is properly initialized
            if (!$this->apiInstance) {
                Log::error('Brevo API client not initialized', ['order_id' => $orderId]);
                return false;
            }

            $order = Order::where('id', '=', $orderId)->first();
            if (!$order) {
                Log::error('Order not found for sending voucher', ['order_id' => $orderId]);
                return false;
            }

            $vouchers = Voucher::where('order_id', '=', $orderId)->get();
            if ($vouchers->isEmpty()) {
                Log::error('No vouchers found for order', ['order_id' => $orderId]);
                return false;
            }

            $customer_email = $order->customer_email;

            $attachments = [];
            foreach ($vouchers as $voucher) {
                Log::info('Generating PDF for voucher', ['voucher_id' => $voucher->id]);
                $pdf = VoucherUtility::generateVoucherPDF($voucher);
                if ($pdf != null) {
                    // Convert PDF output to base64
                    $attachments[] = [
                        'content' => base64_encode($pdf->output()),
                        'name' => 'voucher_' . $voucher->voucher_code . '.pdf'
                    ];
                    Log::info('PDF generated successfully', ['voucher_id' => $voucher->id]);
                } else {
                    Log::error('Failed to generate PDF for voucher', ['voucher_id' => $voucher->id]);
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

            Log::debug('Sending email to Brevo API', [
                'order_id' => $orderId,
                'recipient' => $customer_email,
                'num_attachments' => count($attachments)
            ]);

            try {
                $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
                Log::info('Email sent successfully via Brevo API', [
                    'order_id' => $orderId,
                    'message_id' => isset($result['messageId']) ? $result['messageId'] : 'N/A'
                ]);

                // Mark vouchers as sent
                foreach ($vouchers as $voucher) {
                    $voucher->is_sent = true;
                    $voucher->save();
                }

                return response()->json('Email was sent successfully!');
            } catch (\SendinBlue\Client\ApiException $apiException) {
                Log::error('Brevo API exception: ' . $apiException->getMessage(), [
                    'order_id' => $orderId,
                    'error_code' => $apiException->getCode(),
                    'response_body' => $apiException->getResponseBody()
                ]);
                return false;
            }
        } catch (\Exception $exception) {
            Log::error('Error sending voucher email', [
                'order_id' => $orderId,
                'error' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString()
            ]);
            return false;
        }
    }

    /**
     * @param string $template
     * @param array $dataParams
     * @param array $to
     * @param string $subject
     * @param array $attachments
     * @return \Illuminate\Http\JsonResponse|bool
     * @throws \Throwable
     */
    public function sendEmail($template, $dataParams, $to, $subject, $attachments = [])
    {
        try {
            // Check if the API instance is properly initialized
            if (!$this->apiInstance) {
                Log::error('Brevo API client not initialized', ['template' => $template, 'subject' => $subject]);
                return false;
            }

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

            Log::debug('Sending regular email to Brevo API', [
                'subject' => $subject,
                'recipients' => array_map(function ($recipient) {
                    return $recipient['email'];
                }, $to)
            ]);

            try {
                $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
                Log::info('Regular email sent successfully via Brevo API', [
                    'subject' => $subject,
                    'message_id' => isset($result['messageId']) ? $result['messageId'] : 'N/A'
                ]);
                return response()->json('Email was sent successfully!');
            } catch (\SendinBlue\Client\ApiException $apiException) {
                Log::error('Brevo API exception: ' . $apiException->getMessage(), [
                    'subject' => $subject,
                    'error_code' => $apiException->getCode(),
                    'response_body' => $apiException->getResponseBody()
                ]);
                return false;
            }
        } catch (\Exception $exception) {
            Log::error('Error sending email', [
                'subject' => $subject,
                'error' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString()
            ]);
            return false;
        }
    }
}
