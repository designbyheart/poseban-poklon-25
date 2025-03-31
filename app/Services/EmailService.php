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
     * Send voucher emails to customer with PDF attachments
     *
     * @param string $orderId
     * @return bool|\Illuminate\Http\JsonResponse Success status
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

            $order = Order::where('id', '=', $orderId)->with('vouchers')->first();
            if (!$order) {
                Log::error('Order not found for sending voucher', ['order_id' => $orderId]);
                return false;
            }

            // Don't send vouchers for failed or unpaid orders
            if ($order->status->id !== 2) { // 2 = Paid status
                Log::warning('Attempted to send vouchers for non-paid order', [
                    'order_id' => $order->id,
                    'status_id' => $order->status->id
                ]);
                return false;
            }

            $vouchers = $order->vouchers;
            if ($vouchers->isEmpty()) {
                Log::error('No vouchers found for order', ['order_id' => $orderId]);
                return false;
            }

            // Get recipient emails
            $customer_email = $order->customer_email;
            $recipient_email = $order->rec_email ?? $customer_email;
            
            // Check if there are different recipients
            $recipients = [$customer_email];
            if (!empty($recipient_email) && $recipient_email !== $customer_email) {
                $recipients[] = $recipient_email;
                Log::info('Multiple email recipients detected', [
                    'order_id' => $orderId,
                    'customer_email' => $customer_email,
                    'recipient_email' => $recipient_email
                ]);
            }

            Log::info('Found ' . $vouchers->count() . ' vouchers to send', [
                'order_id' => $orderId,
                'recipients' => $recipients
            ]);

            // Generate PDFs for all vouchers
            $attachments = [];
            $failedPdfs = 0;
            foreach ($vouchers as $voucher) {
                Log::info('Generating PDF for voucher', [
                    'voucher_id' => $voucher->id,
                    'voucher_code' => $voucher->voucher_code
                ]);

                // Generate PDF using utility class
                $pdf = \App\Utilities\VoucherUtility::generateVoucherPDF($voucher);

                if ($pdf !== null) {
                    try {
                        // Convert PDF output to base64
                        $pdfOutput = $pdf->output();
                        $base64Content = base64_encode($pdfOutput);

                        // Verify the PDF is not empty
                        if (empty($base64Content)) {
                            Log::warning('PDF content is empty', ['voucher_id' => $voucher->id]);
                            $failedPdfs++;
                            continue;
                        }

                        $attachments[] = [
                            'content' => $base64Content,
                            'name' => 'voucher_' . $voucher->voucher_code . '.pdf'
                        ];

                        Log::info('PDF generated and attached successfully', [
                            'voucher_id' => $voucher->id,
                            'size' => strlen($base64Content)
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Failed to process PDF for attachment', [
                            'voucher_id' => $voucher->id,
                            'error' => $e->getMessage()
                        ]);
                        $failedPdfs++;
                    }
                } else {
                    Log::error('Failed to generate PDF for voucher', ['voucher_id' => $voucher->id]);
                    $failedPdfs++;
                }
            }

            // If all PDFs failed to generate, log an error
            if ($failedPdfs === $vouchers->count()) {
                Log::error('All PDFs failed to generate', ['order_id' => $orderId]);
                return false;
            }

            // Track overall success
            $allEmailsSent = true;
            
            // Send emails to each recipient
            foreach ($recipients as $recipient) {
                $emailData = [
                    'to' => [
                        [
                            'email' => $recipient,
                            'name' => $recipient === $customer_email 
                                ? ($order->customer_name ?? 'Customer') 
                                : ($order->rec_name ?? 'Recipient')
                        ]
                    ],
                    'sender' => $this->sender,
                    'htmlContent' => view('emails.voucher.customer_email', [
                        'order' => $order,
                        'is_recipient' => $recipient !== $customer_email
                    ])->render(),
                    'params' => [
                        'order_id' => $order->id,
                    ],
                    'subject' => 'Vaš e-vaučer posebnog poklona - po porudzbini br. ' . $order->id,
                ];
    
                if (count($attachments) > 0) {
                    $emailData['attachment'] = $attachments;
                    Log::info('Attaching ' . count($attachments) . ' voucher PDFs to email', [
                        'order_id' => $orderId,
                        'recipient' => $recipient
                    ]);
                } else {
                    Log::error('No PDFs were successfully generated for attaching to email', [
                        'order_id' => $orderId,
                        'recipient' => $recipient
                    ]);
                    // Continue anyway to at least send the email notification
                }
    
                $sendSmtpEmail = new SendSmtpEmail($emailData);
    
                Log::debug('Sending email to Brevo API', [
                    'order_id' => $orderId,
                    'recipient' => $recipient,
                    'num_attachments' => count($attachments)
                ]);
    
                try {
                    $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);
                    Log::info('Email sent successfully via Brevo API', [
                        'order_id' => $orderId,
                        'recipient' => $recipient,
                        'message_id' => isset($result['messageId']) ? $result['messageId'] : 'N/A',
                        'attachments_sent' => count($attachments)
                    ]);
                } catch (\SendinBlue\Client\ApiException $apiException) {
                    Log::error('Brevo API exception: ' . $apiException->getMessage(), [
                        'order_id' => $orderId,
                        'recipient' => $recipient,
                        'error_code' => $apiException->getCode(),
                        'response_body' => $apiException->getResponseBody()
                    ]);
                    $allEmailsSent = false;
                }
            }
            
            // Mark vouchers as sent if all emails were successful
            if ($allEmailsSent) {
                foreach ($vouchers as $voucher) {
                    $voucher->is_sent = true;
                    $voucher->save();
                    Log::info('Marked voucher as sent', ['voucher_id' => $voucher->id]);
                }
                
                return response()->json('Email was sent successfully!');
            } else {
                Log::warning('Not all emails were sent successfully', ['order_id' => $orderId]);
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