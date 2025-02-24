<?php

namespace App\Enums;

class PaymentType
{
    const OTHER = 0;
    const CASH = 1;
    const CARD = 2;
    const CHECK = 3;
    const WIRE_TRANSFER = 4;
    const VOUCHER = 5;
    const MOBILE_MONEY = 6;
}
