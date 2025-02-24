<?php

namespace App;

use App\Enums\InvoiceType;
use App\Enums\PaymentType;
use App\Enums\TaxType;
use App\Enums\TransactionType;
use Carbon\Carbon;


class InvoiceItem
{
    private $dateAndTimeOfIssue;
    public $invoiceType;
    public $transactionType;
    public $payment;
    public $buyerId;
    public $cashier;
    public $referentDocumentDT;
    public $items;

    public $referentDocumentNumber;
    public $options;

    public function __construct(Order $order)
    {
        $this->dateAndTimeOfIssue = Carbon::now();
        $this->invoiceType = InvoiceType::NORMAL;
        $this->transactionType = TransactionType::SALE;
        $this->payment = [
            [
                'amount' => $order->total,
                'paymentType' => PaymentType::CARD,
            ]
        ];
        $this->cashier = 'Poseban Poklon - Web App';
        $this->buyerId = $order->user_id;
        $this->referentDocumentNumber = $order->id;
        $this->referentDocumentDT = Carbon::now();
        $this->options = [
            'nazivKupca' => $order->customer_name . ' ' . $order->customer_surname,
            'emailToBuyer' => 1,
            'buyerEmailAddress' => $order->customer_email,
        ];
        $this->items = [];

        foreach ($order->items as $item) {
            $this->items[] = [
                'gtin' => $item->product->id,
                'name' => $item->product->title,
                'unitLabel' => 'kom',
                'quantity' => $item->product_quantity,
                'unitPrice' => $item->product_price,
                'totalAmount' => $item->product_total,
                'labels' => [
                    [
                        'label' => TaxType::NO_VAT
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
                return $value->format('Y-m-d\TH:i:s.uP');
            }
            return $value;
        }, $array);
    }
}
