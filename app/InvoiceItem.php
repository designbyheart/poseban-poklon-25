<?php

namespace App;

use App\Enums\InvoiceType;
use App\Enums\PaymentType;
use App\Enums\TaxType;
use App\Enums\TransactionType;
use Carbon\Carbon;


// Info: https://elefakt.rs/apiDoc/
class InvoiceItem
{
    public $invoiceType;
    public $transactionType;
    public $payment;
    public $buyerId;
    public $cashier;
    public $items;
    public $options;

    public function __construct(Order $order)
    {
        $this->invoiceType = InvoiceType::NORMAL; //  InvoiceType::TRAINING;
        $this->transactionType = TransactionType::SALE;
        $this->buyerId = null;

        $this->payment = [
            [
                'amount' => number_format($order->total, 2, '.', ''),
                'paymentType' => PaymentType::CARD,
            ]
        ];
        $this->cashier = 'Poseban Poklon - Web App';

        $this->options = [
            'nazivKupca' => $order->customer_name . ' ' . $order->customer_surname,
            'emailToBuyer' => 1,
            'buyerEmailAddress' => $order->customer_email,
        ];
        $this->items = [];

        foreach ($order->items as $item) {
            $this->items[] = [
                'name' => $item->product->title,
                'unitLabel' => 'kom',
                'quantity' => (string)$item->product_quantity,
                'unitPrice' => number_format($item->product_price, 2, '.', ''),
                'totalAmount' => number_format($item->product_total, 2, '.', ''),
                'labels' => [
                    [
                        'label' => TaxType::PROD_NO_VAT
                    ]
                ],
            ];
        }
    }

    public function toArray()
    {
        $array = get_object_vars($this);
        return array_map(function ($value) {
            if ($value instanceof Carbon) {
                return $value->format('Y-m-d\TH:i:s');
            }
            return $value;
        }, $array);
    }
}
