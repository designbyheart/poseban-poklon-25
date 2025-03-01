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
    private $dateAndTimeOfIssue;
    public $invoiceType;
    public $transactionType;
    public $payment;
//    public $buyerId;
    public $cashier;
    public $payableAmount;
//    public $referentDocumentDT;
    public $items;

//    public $referentDocumentNumber;
    public $options;

    public function __construct(Order $order)
    {
        $this->dateAndTimeOfIssue = Carbon::now();
        $this->invoiceType = InvoiceType::TRAINING;
        $this->transactionType = TransactionType::SALE;
        $this->payableAmount = $order->total;

        $this->payment = [
            [
                'amount' => $order->total,
                'paymentType' => PaymentType::CARD,
            ]
        ];
        $this->cashier = 'Poseban Poklon';

        if($order->user_id){
            $this->buyerId = $order->user_id;
        }

        // Note: These fields are reserved for refund
        // $this->referentDocumentNumber = $order->id;
        // $this->referentDocumentDT = Carbon::now();
        $this->options = [
            'nazivKupca' => $order->customer_name . ' ' . $order->customer_surname,
            'emailToBuyer' => 1,
            'buyerEmailAddress' => $order->customer_email,
        ];
        $this->items = [];

        foreach ($order->items as $item) {
            $this->items[] = [
//                'gtin' => $item->product->id,
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
                return $value->format('Y-m-d\TH:i:s');
            }
            return $value;
        }, $array);
    }
}
