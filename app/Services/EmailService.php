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
            $config = Configuration::getDefaultConfiguration()
            ->setApiKey('api-key', config('services.brevo.key'));

            $this->apiInstance = new TransactionalEmailsApi(
            new Client(),
                $config
            );
    }

    /**
     * Send voucher emails to customer with PDF attachments
     *
     * @param string $orderId
     * @return bool|\Illuminate\Http\JsonResponse Success status
     * @throws \Throwable
     */
    public function sendVoucher($orderId)
    {
        try {
            $order = Order::with(['vouchers'])->findOrFail($orderId);

            // Create email data
                $emailData = [
                    'to' => [
                        [
                        'email' => $order->customer_email,
                        'name' => $order->customer_name ?: 'Valued Customer'
                        ]
                    ],
                    'sender' => $this->sender,
                'subject' => 'Vaš e-vaučer posebnog poklona - po porudzbini br. ' . $orderId,
                'htmlContent' => view('emails.voucher.voucher_email', [
                        'order' => $order,
                    'vouchers' => $order->vouchers
                ])->render(),
                'attachment' => []
                ];

            // Add voucher PDFs as attachments
            foreach ($order->vouchers as $voucher) {
                $pdf = $voucher->generatePDF('a4');
                if ($pdf) {
                $emailData['attachment'][] = [
                    'content' => base64_encode($pdf->setPaper('a4', 'portrait')->output()),
                        'name' => 'voucher_' . $voucher->voucher_code . '.pdf',
                        'type' => 'application/pdf'
                ];
            }
            }

            if (empty($emailData['attachment'])) {
                Log::error('No voucher attachments generated', ['order_id' => $orderId]);
                throw new \Exception('Failed to generate voucher attachments');
            }

            Log::info('Sending email via Brevo API', [
                        'order_id' => $orderId,
                'recipient' => $order->customer_email,
                'voucher_count' => count($emailData['attachment'])
                    ]);

            $this->apiInstance->sendTransacEmail($emailData);

                return true;
        } catch (\Exception $e) {
            Log::error('Failed to send voucher email', [
                'order_id' => $orderId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Send a general email with optional attachments
     *
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

            // Convert any complex objects to arrays to prevent serialization issues
            $processedParams = [];
            foreach ($dataParams as $key => $value) {
                if (is_object($value) && method_exists($value, 'toArray')) {
                    $processedParams[$key] = $value->toArray();
                } else {
                    $processedParams[$key] = $value;
                }
            }

            // Render the HTML content first to avoid passing objects to SendSmtpEmail
            $htmlContent = view($template, $dataParams)->render();

            $emailParams = [
                'to' => $to,
                'sender' => $this->sender,
                'htmlContent' => $htmlContent,
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
