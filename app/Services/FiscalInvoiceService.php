<?php

namespace App\Services;

use App\Invoice;
use App\InvoiceItem;
use App\Order;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class FiscalInvoiceService
{
    private $authId;
    private $url;
    private $client;
    private $country;
    private $apiKey;
    private $authEmail;
    private $authPassword;
    private $pac;
    private $authToken;

    public function __construct()
    {
        $this->authId = env('FISCAL_AUTH_TOKEN');
        $this->country = env('FISCAL_COUNTRY');
        $this->apiKey = env('FISCAL_API_KEY');
        $this->authEmail = env('FISCAL_AUTH_EMAIL');
        $this->authPassword = env('FISCAL_AUTH_PASSWORD');
        $this->pac = env('FISCAL_PAC');
        $this->client = new Client();
        $this->url = env('FISCAL_COUNTRY_URL', 'https://europe-central2-esir-44ade.cloudfunctions.net');
        $this->authToken = null;
    }

    /**
     * Sign in to the fiscal service and get authentication token
     */
    public function signin()
    {
        $url = $this->url . 'accounts:signInWithPassword?key=' . $this->apiKey;

        try {
            $response = $this->client->request('POST', $url, [
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded'
                ],
                'form_params' => [
                    'returnSecureToken' => 'true',
                    'email' => $this->authEmail,
                    'password' => $this->authPassword
                ]
            ]);

            $responseData = json_decode($response->getBody(), true);

            if (isset($responseData['idToken'])) {
                $this->authToken = $responseData['idToken'];

                Log::info('Successfully signed in to fiscal service', [
                    'email' => $this->authEmail
                ]);

                return [
                    'success' => true,
                    'message' => 'Successfully signed in',
                    'token' => $this->authToken,
                    'data' => $responseData
                ];
            }

            throw new Exception('No token received in response');

        } catch (Exception $e) {
            Log::error('Error signing in to fiscal service: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => 'Failed to sign in',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Check the fiscal service status to confirm token works
     */
    public function status()
    {
        // Ensure we have a valid token
        if (!$this->authToken) {
            $signInResult = $this->signin();
            if (!$signInResult['success']) {
                return $signInResult;
            }
        }

        $url = $this->url . 'taxcore:status?key=' . $this->apiKey;

        try {
            $response = $this->client->request('GET', $url, [
                'headers' => [
                    'PAC' => $this->pac,
                    'Authorization' => 'Bearer ' . $this->authToken
                ]
            ]);

            $responseData = json_decode($response->getBody(), true);

            Log::info('Fiscal service status check successful');

            return [
                'success' => true,
                'message' => 'Status check successful',
                'data' => $responseData
            ];

        } catch (Exception $e) {
            Log::error('Error checking fiscal service status: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => 'Status check failed',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Generate fiscal invoice based on order and order items
     */
    public function generateInvoice(Order $order)
    {
        // Ensure we have a valid token
        if (!$this->authToken) {
            $signinResult = $this->signin();
            if (!$signinResult['success']) {
                return $signinResult;
            }
        }

        try {
            // Prepare invoice data based on order
            $invoiceData = $this->prepareInvoiceData($order);

            $url = $this->url . '/v1/taxcore:invoice?key=' . $this->apiKey;

            $response = $this->client->request('POST', $url, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'PAC' => $this->pac,
                    'Authorization' => 'Bearer ' . $this->authToken
                ],
                'json' => $invoiceData
            ]);

            $responseData = json_decode($response->getBody(), true);

            // Save invoice data to database
            $this->saveInvoice($order, $responseData);

            Log::info('Fiscal invoice generated successfully', [
                'order_id' => $order->id,
                'invoice_data' => $responseData
            ]);

            return [
                'success' => true,
                'message' => 'Invoice generated successfully',
                'data' => $responseData
            ];

        } catch (Exception $e) {
            Log::error('Error generating fiscal invoice: ' . $e->getMessage(), [
                'order_id' => $order->id,
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => 'Failed to generate invoice',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Prepare invoice data structure based on order
     */
    private function prepareInvoiceData(Order $order)
    {
        $items = [];

        // Process order items
        foreach ($order->orderItems as $orderItem) {
            $items[] = [
                'name' => $orderItem->product_name,
                'quantity' => $orderItem->quantity,
                'price' => $orderItem->price,
                'total' => $orderItem->quantity * $orderItem->price,
                'tax_rate' => $orderItem->tax_rate ?? 20, // Default tax rate
                'unit' => $orderItem->unit ?? 'kom'
            ];
        }

        return [
            'customer' => [
                'name' => $order->customer_name,
                'email' => $order->customer_email,
                'phone' => $order->customer_phone,
                'address' => $order->customer_address
            ],
            'items' => $items,
            'total_amount' => $order->total_amount,
            'currency' => $order->currency ?? 'RSD',
            'order_id' => $order->id,
            'created_at' => $order->created_at->toISOString()
        ];
    }

    /**
     * Check the fiscal service status (legacy method - kept for backward compatibility)
     */
    public function checkStatus()
    {
        return $this->status();
    }

    /**
     * Send invoice for an order to the fiscal service
     */
    public function sendInvoiceForOrder(Order $order)
    {
        try {
            // Create invoice data structure based on the order
            $invoiceData = $this->prepareInvoiceData($order);

            // Make the API call to create fiscal invoice
            $response = $this->client->request('POST', $this->url . '/v1/taxcore:invoice', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->getAuthToken(),
                    'PAC' => $this->pac,
                    'Content-Type' => 'application/json'
                ],
                'json' => $invoiceData
            ]);

            // Process response
            $responseData = json_decode($response->getBody(), true);

            // Save invoice data to database
            $this->saveInvoice($order, $responseData);

            return [
                'success' => true,
                'message' => 'Invoice sent successfully',
                'data' => $responseData
            ];
        } catch (Exception $e) {
            Log::error('Error sending fiscal invoice: ' . $e->getMessage(), [
                'order_id' => $order->id,
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => 'Failed to send invoice',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Retry sending an invoice
     */
    public function retryInvoice(Order $order, $maxRetries = 3)
    {
        $attempts = 0;
        $lastError = null;

        while ($attempts < $maxRetries) {
            try {
                $result = $this->sendInvoiceForOrder($order);
                if ($result['success']) {
                    return $result;
                }
                $lastError = $result['error'] ?? 'Unknown error';
            } catch (Exception $e) {
                $lastError = $e->getMessage();
            }

            $attempts++;
            sleep(2); // Wait before retrying
        }

        return [
            'success' => false,
            'message' => "Failed after $maxRetries attempts",
            'error' => $lastError
        ];
    }

    /**
     * Save invoice data to database
     */
    private function saveInvoice(Order $order, array $invoiceData)
    {
        $invoice = new Invoice();
        $invoice->id = $invoiceData['invoiceNumber'] ?? null;
        $invoice->order_id = $order->id;
        $invoice->user_id = $order->user_id;
        $invoice->email = $order->customer_email;
        $invoice->save();

        // Additional processing can be added here

        return $invoice;
    }

    /**
     * Get authentication token for the fiscal API
     */
    public function getAuthToken()
    {
        if (!$this->authToken) {
            $signinResult = $this->signin();
            if ($signinResult['success']) {
                return $this->authToken;
            }
            return null;
        }

        return $this->authToken;
    }
}
