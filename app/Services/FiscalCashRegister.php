<?php

namespace App\Services;

use App\Invoice;
use App\InvoiceItem;
use App\Order;
use GuzzleHttp\Client;
use App\Exceptions\Exception;
use Illuminate\Support\Facades\Log;

class FiscalCashRegister
{
    private $authId;
    private $url;
    private $client;

    public function __construct()
    {
        $this->authId = env('FISCAL_AUTH_TOKEN');
        $this->url = env('FISCAL_URL');
        $this->client = new Client();
    }

    public function status()
    {
        $res = $this->client->request('GET', $this->url . '/status', [
            'headers' => [
                'authId' => $this->authId
            ]
        ]);

        return $res->getBody();
    }

    public function sendInvoice(Order $order)
    {
        try {
            $invoiceItem = new InvoiceItem($order);
            $invoice = new Invoice();
            $invoice->email = $invoiceItem->options['buyerEmailAddress'];
            $invoice->order_id = $order->id;
            $invoice->user_id = $order->user_id;

            // https://elefakt.rs/apiDoc/#/Invoice/get_invoice__requestId_
            $res = $this->client->request('POST', $this->url . '/invoice', [
                'headers' => [
                    'authId' => $this->authId,
                    'requestId' => $invoice->id,
                ], 'json' => $invoiceItem->toArray()
            ]);

            if ($res->getStatusCode() != 200) {
                Log::error($message = 'error with fiscal invoice: ' . $res->getBody()->getContents());
                throw new Exception('Problem u kreiranju fiskalnog računa.');
            }

            $invoice->save();
        } catch (Exception $e) {
            Log::error('error with fiscal invoice: ' . $e->getMessage());
            exit;
        }
    }
}
