<center>
    <table cellpadding="0" cellspacing="0" width="600" style="width: 600px;">
        <tr>
            <td width="600">
                <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                    <img src="https://posebanpoklon.rs/images/email/header.jpg" style="width: 600px; display: block;" >
                </a>
            </td>
        </tr>
    </table>
    <table cellpadding="0" cellspacing="0" width="600" style="width: 600px; border: 0;">
        <tr>
            <td width="300">
                <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                    <img src="https://posebanpoklon.rs/images/email/social_left.jpg" style="width: 300px; display: block;" >
                </a>
            </td>
            <td width="300">
                <table cellpadding="0" cellspacing="0" width="300" style="width: 300px;">
                    <tr>
                        <td width="38">
                            <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_01.jpg" style="width: 38px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="37">
                            <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_02.jpg" style="width: 37px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="38">
                            <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_03.jpg" style="width: 38px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="37">
                            <a href="https://www.facebook.com/PosebanPoklon" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_04.jpg" style="width: 37px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="38">
                            <a href="https://twitter.com/PPoklon" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_05.jpg" style="width: 38px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="37">
                            <a href="https://www.instagram.com/poseban_poklon/" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_06.jpg" style="width: 37px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="38">
                            <a href="https://posebanpoklon.rs/#youtube" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_07.jpg" style="width: 38px; display: block;"
                                    >
                            </a>
                        </td>
                        <td width="37">
                            <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                                <img src="https://posebanpoklon.rs/images/email/social_right_08.jpg" style="width: 37px; display: block;"
                                    >
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 20px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <span style="font-family: Rubik; font-size: 20px;">Hvala vam što ste sa nama</span>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <span style="font-family: Rubik; color: #ed2025; font-size: 20px;">Broj porudžbine {{ $order->id }} ( {{ $order->created_at }}
                    )</span>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>

    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <table cellpadding="0" cellspacing="0" width="600"
                       style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Poklon</td>
                        <td width="50" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Količina</td>
                        <td width="100" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Cena</td>
                        <td width="100" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Iznos</td>
                    </tr>
                    @foreach($order->items as $item)
                        <tr>
                            <td width="250" style="border: 1px solid #fdeaf0;">
                                <table cellpadding="0" cellspacing="0" width="250"
                                       style="width: 250px; border: 0; background: #ffffff;">
                                    <tr>
                                        <td width="250" style="padding: 15px; font-family: Rubik; color: grey;">{{ $item->product->title }}</td>
                                    </tr>
                                </table>
                            </td>
                            <td align="center" width="50" style="padding: 15px; border: 1px solid #fdeaf0; text-align: center; font-family: Rubik; color: grey;">
                                {{ $item->product_quantity }}
                                </td>
                            <td width="100"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                                {{ $item->product_price }} RSD</td>
                            <td width="100"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                                {{ $item->product_total - $item->box_total }} RSD</td>
                        </tr>

                        @if($item->box_count > 0)
                            <tr>
                                <td width="250" style="border: 1px solid #fdeaf0;">
                                    <table cellpadding="0" cellspacing="0" width="250"
                                           style="width: 250px; border: 0; background: #ffffff;">
                                        <tr>
                                            <td width="250" style="padding: 15px; font-family: Rubik; color: grey;">Poklon kutija</td>
                                        </tr>
                                    </table>
                                </td>
                                <td align="center" width="50" style="padding: 15px; border: 1px solid #fdeaf0; text-align: center; font-family: Rubik; color: grey;">
                                    {{ $item->box_count }}
                                </td>
                                <td width="100"
                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                                    690 RSD</td>
                                <td width="100"
                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                                    {{ $item->box_total }} RSD</td>
                            </tr>
                        @endif

                        @if($item->product->promotion != null)
                            <tr>
                                <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                    Promotion Title
                                </td>
                                <td width="250"
                                    style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $item->product->promotion->title }}</td>
                            </tr>
                        @else
                        @endif
                    @endforeach

                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Isporuka:
                            <br> {{ $order->shippingMethod->name }}
                        </td>
                        <td width="50" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;"></td>
                        <td width="100" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                            {{ $order->shippingMethod->cost }} RSD
                        </td>
                        <td width="100" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                            {{ $order->shippingMethod->cost }} RSD
                        </td>
                    </tr>
                    @if($order->discount != null)
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">Discounts</td>
                        <td width="50" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                        </td>
                        <td width="100"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                            {{ $order->discount }} RSD
                        </td>
                        <td width="100"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">
                            {{ $order->discount }} RSD
                        </td>
                    @else
                    @endif
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Svega</td>
                        <td width="250" colspan="3" align="right"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->total }}
                            RSD</td>
                    </tr>
                </table>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>

    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 20px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <span style="font-family: Rubik; color: #ed2025; border-bottom: 1px solid #ed2025; padding-bottom: 5px;">Podaci za uplatu</span>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>

    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <table cellpadding="0" cellspacing="0" width="600"
                       style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Način plaćanja</td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->paymentMethod->name }}</td>
                    </tr>
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Uplatilac
                        </td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->customer_name }} {{ $order->customer_surname }}</td>
                    </tr>
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Svrha uplate
                        </td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">Porudžbina br. {{ $order->id }}</td>
                    </tr>
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Primalac
                        </td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">Virtual Media Team doo <br>Metalska 64/4, 11060 Beograd, Srbija</td>
                    </tr>
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Broj žiro računa primaoca
                        </td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">160-0000000492792-77</td>
                    </tr>
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Iznos
                        </td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->total }}</td>
                    </tr>
                    <tr>
                        <td width="250" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                            Poziv na broj
                        </td>
                        <td width="250"
                            style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->id }}</td>
                    </tr>
                    @if(isset($transaction_data))
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                Broj porudžbine
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->order_id}}</td>
                        </tr>
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                Autorizacioni kod
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->auth_code}}</td>
                        </tr>
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                ID transakcije
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->trans_id}}</td>
                        </tr>
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                Status transakcije
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->response}}</td>
                        </tr>
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                Kod statusa transakcije
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->proc_return_code}}</td>
                        </tr>
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                Datum transakcije
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->extra_trxdate}}</td>
                        </tr>
                        <tr>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik;">
                                Statusni kod 3D transakcije
                            </td>
                            <td width="250"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{$transaction_data->md_status}}</td>
                        </tr>
                    @endif
                </table>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>

    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 20px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <span style="font-family: Rubik; color: #ed2025; border-bottom: 1px solid #ed2025; padding-bottom: 5px;">Adresa za isporuku</span>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>
    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <table cellpadding="0" cellspacing="0" width="600"
                       style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                    
                    @if($order->address_one != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->rec_name }}</td>
                        </tr>
                    @else
                    @endif
                    
                    @if($order->address_one != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->rec_surname }}</td>
                        </tr>
                    @else
                    @endif
                    
                    @if($order->address_one != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->rec_phone }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->address_one != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->rec_email }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->address_one != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->address_one }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->address_two != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->address_two }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->country != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->country }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->city != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->city }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->zip_code!= null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->zip_code }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->giftcard_code != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->giftcard_code }}</td>
                        </tr>
                    @else
                    @endif

                    @if($order->coupon_code != null)
                        <tr>
                            <td width="500"
                                style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->coupon_code }}</td>
                        </tr>
                    @else
                    @endif
                </table>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>

    <table cellpadding="0" cellspacing="0" width="600"
           style="padding: 10px 0 10px 0; width: 600px; border: 0; background: #ffffff;">
        <tr>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
            <td width="508">
                <table cellpadding="0" cellspacing="0" width="600"
                       style="width: 508px; border: 0; background: #ffffff; border: 1px solid #fdeaf0;">
                    @if($order->comment != null)
                                    <tr>
                                        <td width="500" style="padding: 15px; border: 1px solid #fdeaf0; font-family: Rubik; color: grey;">{{ $order->comment }}</td>
                                    </tr>
                                @else
                                @endif
                </table>
            </td>
            <td width="46" style="width: 46px; background: #ffffff;">
                <img src="https://posebanpoklon.rs/images/email/white_td.jpg" >
            </td>
        </tr>
    </table>


    <table cellpadding="0" cellspacing="0" width="600" style="width: 600px; border: 0;">
        <tr>
            <td width="600">
                <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                    <img src="https://posebanpoklon.rs/images/email/footer_icons.jpg" style="width: 600px; display: block;" >
                </a>
            </td>
        </tr>
    </table>
    <table cellpadding="0" cellspacing="0" width="600" style="width: 600px; border: 0;">
        <tr>
            <td width="600">
                <a href="https://posebanpoklon.rs/" style="text-decoration: none;">
                    <img src="https://posebanpoklon.rs/images/email/footer.jpg" style="width: 600px; display: block;" >
                </a>
            </td>
        </tr>
    </table>
</center>