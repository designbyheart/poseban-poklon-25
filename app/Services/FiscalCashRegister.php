<?php

namespace App\Services;

use App\Invoice;
use App\InvoiceItem;
use App\Order;
use GuzzleHttp\Client;

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
            $invoice->save();

            $res = $this->client->request('POST', $this->url . '/invoice', [
                'headers' => [
                    'authId' => $this->authId,
                    'requestId' => $invoice->id,
                ], 'json' => $invoiceItem->toArray()
            ]);
            if($res->getStatusCode() != 200) {
                throw new \Exception('Problem u kreiranju fiskalnog računa.');
            }
        } catch (\Exception $e) {
            print_r('error: ' . $e->getMessage());

            exit;
        }
    }
}
