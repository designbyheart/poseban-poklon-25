@extends('layouts.app')

@section('seo_title', 'Poseban Poklon | Thank you for your order')

@section('content')

    @if(isset($order))
        @if(isset($transaction_data))
            <section class="success-content container">
                <div class="row">
                    <div class="col-lg-12 col-success">
                        @if($success)
                            <h2 class="success-title">Čestitamo! Tvoj poklon je zaista poseban!</h2>
                            <h3 class="success-subtitle">Uspešno ste izvršili plaćanje – račun Vaše platne kartice je zadužen.</h3>
                            <div class="success-box">
                                <p class="success-text">
                                    Detalji porudžbine su već na tvojoj mejl adresi, a ako ih ne nalaziš odmah, za svaki
                                    slučaj proveri i SPAM folder.
                                    Srećni smo što učestvujemo u lepim iznenađenjima i stvaramo nezaboravne trenutke
                                    zajedno!
                                    Do sledećeg poklona i sledeće posebne prilike <br>
                                    Hvala!
                                </p>
                                <div class="success-box-image">
                                    <img src="/images/success_order_icon.jpg" alt="PosebanPoklon" class="success-image">
                                </div>
                            </div>
                        @else
                            <h2 class="success-title">Plaćanje neuspešno – račun Vaše platne kartice nije zadužen.</h2>
                            <div class="success-box">
                                <p class="success-text">
                                    Detalji porudžbine su već na tvojoj mejl adresi, a ako ih ne nalaziš odmah, za svaki
                                    slučaj proveri i SPAM folder.
                                </p>
                            </div>
                        @endif

                        <center>
                            <table cellpadding="0" cellspacing="0" width="600"
                                   style="padding: 20px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                <tr>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                    <td width="508">
                                    <span style="font-family: Rubik, sans-serif; color: #ed2025; font-size: 20px;">Broj porudžbine {{ $order->id }} ( {{ $order->created_at }} )</span>
                                    </td>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                </tr>
                            </table>

                            <table cellpadding="0" cellspacing="0" width="600"
                                   style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                <tr>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                    <td width="508">
                                        <table cellpadding="0" cellspacing="0" width="600"
                                               style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Poklon
                                                </td>
                                                <td width="50"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Količina
                                                </td>
                                                <td width="100"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Cena
                                                </td>
                                                <td width="100"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Iznos
                                                </td>
                                            </tr>
                                            @foreach($order->items as $item)
                                                <tr>
                                                    <td width="250" style="border: 1px solid #fdeaf0;">
                                                        <table cellpadding="0" cellspacing="0" width="250"
                                                               style="width: 250px; border: 0; background: #ffffff;">
                                                            <tr>
                                                                <td width="250"
                                                                    style="padding: 15px; font-family: Rubik, sans-serif; color: grey;">{{ $item->product->title }}</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td align="center" width="50"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; text-align: center; font-family: Rubik, sans-serif; color: grey;">
                                                        {{ $item->product_quantity }}
                                                    </td>
                                                    <td width="100"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                        {{ $item->product_price }} RSD
                                                    </td>
                                                    <td width="100"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                        {{ $item->product_total - $item->box_total }} RSD
                                                    </td>
                                                </tr>

                                                @if($item->box_count > 0)
                                                    <tr>
                                                        <td width="250" style="border: 1px solid #fdeaf0;">
                                                            <table cellpadding="0" cellspacing="0" width="250"
                                                                   style="width: 250px; border: 0; background: #ffffff;">
                                                                <tr>
                                                                    <td width="250"
                                                                        style="padding: 15px; font-family: Rubik, sans-serif; color: grey;">
                                                                        Poklon kutija
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td align="center" width="50"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; text-align: center; font-family: Rubik, sans-serif; color: grey;">
                                                            {{ $item->box_count }}
                                                        </td>
                                                        <td width="100"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                            690 RSD
                                                        </td>
                                                        <td width="100"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                            {{ $item->box_total }} RSD
                                                        </td>
                                                    </tr>
                                                @endif

                                                @if($item->product->promotion !== null)
                                                    <tr>
                                                        <td width="250"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                            Promotion Title
                                                        </td>
                                                        <td width="250"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $item->product->promotion->title }}</td>
                                                    </tr>
                                                @else
                                                @endif
                                            @endforeach

                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Isporuka:
                                                    <br> {{ $order->shippingMethod->name }}
                                                </td>
                                                <td width="50"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;"></td>
                                                <td width="100"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                    {{ $order->shippingMethod->cost }} RSD
                                                </td>
                                                <td width="100"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                    {{ $order->shippingMethod->cost }} RSD
                                                </td>
                                            </tr>
                                            @if($order->discount != null)
                                                <tr>
                                                    <td width="250"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                        Discounts
                                                    </td>
                                                    <td width="50"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                    </td>
                                                    <td width="100"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                        {{ $order->discount }} RSD
                                                    </td>
                                                    <td width="100"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                        {{ $order->discount }} RSD
                                                    </td>
                                            @else
                                            @endif
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Svega
                                                </td>
                                                <td width="250" colspan="3" align="right"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->total }}
                                                    RSD
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                </tr>
                            </table>

                            <table cellpadding="0" cellspacing="0" width="600"
                                   style="padding: 20px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                <tr>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                    <td width="508">
                                        <span style="font-family: Rubik, sans-serif; color: #ed2025; border-bottom: 1px solid #ed2025; padding-bottom: 5px;">Podaci za uplatu</span>
                                    </td>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0" width="600"
                                   style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                <tr>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                    <td width="508">
                                        <table cellpadding="0" cellspacing="0" width="600"
                                               style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Način plaćanja
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->paymentMethod->name }}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Uplatilac
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->customer_name }} {{ $order->customer_surname }}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Svrha uplate
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                    Porudžbina br. {{ $order->id }}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Primalac
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                    Virtual Media Team doo <br>Metalska 64/4, 11060 Beograd, Srbija
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Broj žiro računa primaoca
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">
                                                    160-0000000492792-77
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Iznos
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->total }}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Broj porudžbine
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->order_id}}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Autorizacioni kod
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->auth_code}}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    ID transakcije
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->trans_id}}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Status transakcije
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->response}}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Kod statusa transakcije
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->proc_return_code}}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Datum transakcije
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->extra_trxdate}}</td>
                                            </tr>
                                            <tr>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif;">
                                                    Statusni kod 3D transakcije
                                                </td>
                                                <td width="250"
                                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{$transaction_data->md_status}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="46" style="width: 46px; background: #ffffff;">
                                        <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                    </td>
                                </tr>
                            </table>

                            @if($order->shippingMethod->id != 9)
                                <table cellpadding="0" cellspacing="0" width="600"
                                       style="padding: 20px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                    <tr>
                                        <td width="46" style="width: 46px; background: #ffffff;">
                                            <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                        </td>
                                        <td width="508">
                                            <span style="font-family: Rubik, sans-serif; color: #ed2025; border-bottom: 1px solid #ed2025; padding-bottom: 5px;">Adresa za isporuku</span>
                                        </td>
                                        <td width="46" style="width: 46px; background: #ffffff;">
                                            <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                        </td>
                                    </tr>
                                </table>
                                <table cellpadding="0" cellspacing="0" width="600"
                                       style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                    <tr>
                                        <td width="46" style="width: 46px; background: #ffffff;">
                                            <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                        </td>
                                        <td width="508">
                                            <table cellpadding="0" cellspacing="0" width="600"
                                                   style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">

                                                @if($order->address_one != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->rec_name }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->address_one != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->rec_surname }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->address_one != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->rec_phone }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->address_one != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->rec_email }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->address_one != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->address_one }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->address_two != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->address_two }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->country != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->country }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->city != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->city }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->zip_code!= null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->zip_code }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->giftcard_code != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->giftcard_code }}</td>
                                                    </tr>
                                                @else
                                                @endif

                                                @if($order->coupon_code != null)
                                                    <tr>
                                                        <td width="500"
                                                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->coupon_code }}</td>
                                                    </tr>
                                                @else
                                                @endif
                                            </table>
                                        </td>
                                        <td width="46" style="width: 46px; background: #ffffff;">
                                            <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                        </td>
                                    </tr>
                                </table>
                            @else
                            @endif

                            @if($order->comment != null)
                                <table cellpadding="0" cellspacing="0" width="600"
                                       style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
                                    <tr>
                                        <td width="46" style="width: 46px; background: #ffffff;">
                                            <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                        </td>
                                        <td width="508">
                                            <table cellpadding="0" cellspacing="0" width="600"
                                                   style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                                                <tr>
                                                    <td width="500"
                                                        style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik, sans-serif; color: grey;">{{ $order->comment }}</td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td width="46" style="width: 46px; background: #ffffff;">
                                            <img src="https://posebanpoklon.rs/images/email/white_td.jpg">
                                        </td>
                                    </tr>
                                </table>
                            @else
                            @endif
                        </center>

                        @if($success)
                            <div class="success-btn">
                                <a href="/" class="success-link">Naslovna</a>
                            </div>
                        @elseif(isset($payment_params))
                            <form method="post" action="https://bib.eway2pay.com/fim/est3Dgate">
                                <input type="hidden" name="clientid" value="{{$payment_params->clientid}}">
                                <input type="hidden" name="amount" value="{{$payment_params->amount}}">
                                <input type="hidden" name="oid" value="{{$payment_params->oid}}">
                                <input type="hidden" name="okUrl" value="{{$payment_params->okUrl}}">
                                <input type="hidden" name="failUrl" value="{{$payment_params->failUrl}}">
                                <input type="hidden" name="shopurl" value="{{$payment_params->shopurl}}">
                                <input type="hidden" name="trantype" value="{{$payment_params->trantype}}">
                                <input type="hidden" name="currency" value="{{$payment_params->currency}}">
                                <input type="hidden" name="rnd" value="{{$payment_params->rnd}}">
                                <input type="hidden" name="hash" value="{{$payment_params->hash}}">
                                <input type="hidden" name="storetype" value="{{$payment_params->storetype}}">
                                <input type="hidden" name="hashAlgorithm" value="{{$payment_params->hashAlgorithm}}">
                                <input type="hidden" name="lang" value="{{$payment_params->lang}}">
                                <input type="hidden" name="encoding" value="{{$payment_params->encoding}}" />
                                <button type="submit" class="success-btn">Da pokušate ponovo</button>
                                <div class="success-btn">
                                    <a href="/" class="success-link">Naslovna</a>
                                </div>
                            </form>
                        @endif
                    </div>
                </div>
            </section>
        @endif
    @else
        <section class="success-content container">
            <div class="row">
                <div class="col-lg-12 col-success">
                    <h2 class="success-title">Čestitamo! Tvoj poklon je zaista poseban!</h2>
                    <div class="success-box">
                        <p class="success-text">
                            Detalji porudžbine su već na tvojoj mejl adresi, a ako ih ne nalaziš odmah, za svaki slučaj
                            proveri i SPAM folder.
                            Srećni smo što učestvujemo u lepim iznenađenjima i stvaramo nezaboravne trenutke zajedno!
                            Do sledećeg poklona i sledeće posebne prilike <br>
                            Hvala!
                        </p>
                        <div class="success-box-image">
                            <img src="/images/success_order_icon.jpg" alt="PosebanPoklon" class="success-image">
                        </div>
                    </div>
                    <div class="success-btn">
                        <a href="/" class="success-link">Naslovna</a>
                    </div>
                </div>
            </div>
        </section>
    @endif


    <popular-products></popular-products>

@endsection
