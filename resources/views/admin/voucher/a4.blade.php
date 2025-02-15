<!DOCTYPE html>
<html>

<head>
    <title>{{ $title }}</title>
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/user/components/pdf/pdf.css') }}">
    <!-- External styles doesn't work for pdf in queue email-->
    <style>
        html,
        body {
            padding: 0 !important;
            margin: 0 !important;
        }

        @font-face {
            font-family: Rubik;
            src: url("https://posebanpoklon.rs/fonts/user/Rubik-Regular.ttf");
        }

        @font-face {
            font-family: Rubik-light;
            src: url("https://posebanpoklon.rs/fonts/user/Rubik-Light.ttf");
        }

        @font-face {
            font-family: Rubik-bold;
            src: url("https://posebanpoklon.rs/fonts/user/Rubik-Bold.ttf");
        }

        @font-face {
            font-family: Rubik-medium;
            src: url("https://posebanpoklon.rs/fonts/user/Rubik-Medium.ttf");
        }

        @font-face {
            font-family: Atziluth;
            src: url("https://posebanpoklon.rs/fonts/user/Atziluth-Script.ttf");
        }

        .pdf-a4-template {
            position: relative;
            width: 100%;
        }

        .pdf-a4-template .pdf-a4-col-left {
            position: absolute;
            padding: 28px;
            width: 80%;
            height: 100%;
        }

        .pdf-a4-template .pdf-a4-col-right {
            padding: 28px 0;
            position: absolute;
            top: 0;
            right: 0;
            width: 13%;
            height: 100%;
            background: #ed2025;
        }

        .pdf-a4-col-left .pdf-a4-row-1 {
            padding-bottom: 2mm;
            width: 100%;
            border-bottom: 0.5px solid black;
        }

        .pdf-a4-col-left .pdf-a4-row-1 .pdf-a4-logo {
            width: 74mm;
        }

        .pdf-a4-col-left .pdf-a4-row-2 {
            width: 100%;
            border-bottom: 1px solid black;
            height: 22mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-2 .pdf-a4-greeting {
            font-family: Rubik-medium;
            font-size: 15px;
            line-height: 4mm;
            color: #ed2025;
            text-align: center;
            margin: 1mm 0;
            height: 20mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-3 {
            padding: 2mm 0;
            width: 100%;
            height: 16mm;
            border-bottom: 1px solid black;
        }

        .pdf-a4-col-left .pdf-a4-row-3 .pdf-a4-product-title {
            margin: auto;
            height: 16mm;
            font-family: Rubik-bold;
            font-size: 21px;
            line-height: 1;
            color: #ed2025;
            text-align: center;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-4 {
            padding: 2mm 0;
            width: 100%;
        }

        .pdf-a4-col-left .pdf-a4-row-4 .pdf-a4-desc {
            max-height: 44.5mm;
            font-family: Rubik;
            font-size: 13px;
            color: #000;
            text-align: center;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-5 {
            width: 100%;
            border: 0;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr {
            border: 0;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr .a4-row-5-left {
            position: relative;
            border: 0;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr .a4-row-5-left .pdf-a4-product-images {
            margin-right: 3px;
            width: 325px;
            height: 55mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr .a4-row-5-left .pdf-a4-product-images img {
            width: 100%;
            min-height: 55mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr .a4-row-5-right {
            position: relative;
            border: 0;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr .a4-row-5-right .pdf-a4-product-images {
            margin-left: 3px;
            width: 305px;
            height: 55mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-5 tr .a4-row-5-right .pdf-a4-product-images img {
            width: 100%;
            min-height: 55mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-6 {
            padding: 2.4mm 0 2.4mm 0;
            width: 100%;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col {
            width: 33.33333%;
            vertical-align: top;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item {
            margin-top: 1.5mm;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td {
            vertical-align: top;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-icon {
            width: 30px;
            text-align: left;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-icon .a4-information-icon {
            width: 25px;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc {
            margin-right: 1mm;
            width: 175px;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-info .pdf-a4-information-text {
            width: 100%;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-loc {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-clock {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-user {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-cloud {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-tsh {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc .pdf-a4-information-title {
            font-family: Rubik-medium;
            font-size: 12px;
            color: #000;
        }

        .pdf-a4-col-left .pdf-a4-row-6 tr .pdf-a4-information-col .pdf-a4-information-item tr td .pdf-a4-information-desc .pdf-a4-information-text {
            margin-top: 0.5mm;
            font-family: Rubik;
            font-size: 12px;
            color: #000;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item {
            margin-top: 1.5mm;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td {
            vertical-align: top;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-icon {
            width: 30px;
            text-align: left;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-icon .a4-information-icon {
            width: 25px;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc {
            margin-right: 1mm;
            width: 100%;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-info .pdf-a4-information-text {
            width: 100%;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-loc {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-clock {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-user {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-cloud {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc.a4-tsh {
            height: 15mm;
            overflow: hidden;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc .pdf-a4-information-title {
            font-family: Rubik-medium;
            font-size: 12px;
            color: #000;
        }

        .pdf-a4-col-left .pdf-a4-full-width .pdf-a4-information-item tr td .pdf-a4-information-desc .pdf-a4-information-text {
            margin-top: 0.5mm;
            font-family: Rubik;
            font-size: 12px;
            color: #000;
        }

        .pdf-a4-col-left .pdf-a4-row-7 {
            position: absolute;
            bottom: 310px;
            left: 28px;
            padding: 2.4mm 0;
            width: 100%;
            border-top: 1px solid black;
        }

        .pdf-a4-col-left .pdf-a4-row-7 .pdf-a4-row-7-col .pdf-a4-footer-text {
            font-size: 12px;
            font-family: Rubik;
            color: #000;
        }

        .pdf-a4-col-left .pdf-a4-row-7 .pdf-a4-row-7-col .pdf-a4-footer-text .a4-footer-text-color {
            color: #ed2025;
            font-family: Rubik-bold;
        }

        .pdf-a4-col-left .pdf-a4-row-7 .pdf-a4-row-7-col.pdf-a4-footer-qrcode {
            vertical-align: bottom;
        }

        .pdf-a4-col-left .pdf-a4-row-7 .pdf-a4-row-7-col.pdf-a4-footer-qrcode table {
            margin-top: 72px;
            margin-bottom: 0;
            margin-left: auto;
        }

        .pdf-a4-col-left .pdf-a4-row-7 .pdf-a4-row-7-col.pdf-a4-footer-qrcode .pdf-a4-footer-text {
            padding-right: 20px;
            text-align: right;
        }

        .pdf-a4-col-left .pdf-a4-row-7 .pdf-a4-row-7-col.pdf-a4-footer-qrcode .a4-footer-qrcode-image .a4-qrcode-image {
            width: 80px;
            height: 80px;
            -o-object-fit: cover;
            object-fit: cover;
            -o-object-position: center;
            object-position: center;
        }

        .pdf-a4-col-left .pdf-a4-row-8 {
            padding: 2.4mm 0 0 0;
            position: absolute;
            bottom: 10%;
            left: 28px;
            right: 0;
            width: 100%;
        }

        .pdf-a4-col-left .pdf-a4-row-8 .a4-sub-footer-item {
            width: 25%;
        }

        .pdf-a4-col-left .pdf-a4-row-8 .a4-sub-footer-item .a4-sub-footer-icon {
            width: 16px;
            height: 16px;
        }

        .pdf-a4-col-left .pdf-a4-row-8 .a4-sub-footer-item .a4-sub-footer-text {
            margin: auto;
            vertical-align: text-top;
            margin-left: 1mm;
            font-family: Rubik;
            font-size: 11px;
            color: #000;
        }

        .pdf-a4-col-left .pdf-a4-row-8 .a4-sub-footer-item.a4-sub-footer-item-2 {
            padding-left: 0px;
        }

        .pdf-a4-col-left .pdf-a4-row-8 .a4-sub-footer-item.a4-sub-footer-item-3 {
            padding-left: 25px;
        }

        .pdf-a4-col-right .pdf-a4-right-table {
            position: relative;
            width: 100%;
            height: 1200px;
        }

        .pdf-a4-col-right .pdf-a4-right-table tr .pdf-a4-right-top {
            position: relative;
            height: 700px;
        }

        .pdf-a4-col-right .pdf-a4-right-table tr .pdf-a4-right-top .pdf-a4-right-text {
            position: absolute;
            width: 375px;
            height: 255px;
            text-align: center;
            font-family: Rubik;
            font-size: 16px;
            color: #fff;
            transform: rotate(270deg);
        }

        .pdf-a4-col-right .pdf-a4-right-table tr .pdf-a4-right-bottom {
            padding: 28px 28px 0 28px;
            height: 200px;
            vertical-align: bottom;
            position: relative;
        }

        .pdf-a4-col-right .pdf-a4-right-table tr .pdf-a4-right-bottom .pdf-a4-logo-white {
            position: absolute;
            top: -10px;
            left: 10px;
            text-align: center;
            width: 80px;
            min-height: 255px;
            -o-object-fit: cover;
            object-fit: cover;
            -o-object-position: center;
            object-position: center;
        }

        .without_message {
            height: 100px;
        }

    </style>
</head>

<body>
    <div class="pdf-a4-template">
        <div class="pdf-a4-col-left">
            <div class="pdf-a4-row-1">
                <img src="images/pdf/logo-pdf-a4.png" alt="PosebanPoklon" class="pdf-a4-logo">
            </div>
            @if(!empty($personal_message))
            <div class="pdf-a4-row-2">
                <p class="pdf-a4-greeting">{{ $personal_message }}</p>
            </div>
            @else
            <div class="pdf-a4-row-2 without_message">
                <p class="pdf-a4-greeting"></p>
            </div>
            @endif
            <div class="pdf-a4-row-3">
                <p class="pdf-a4-product-title">
                    {{ $product_title }}
                </p>
            </div>
            <div class="pdf-a4-row-4">
                <p class="pdf-a4-desc">
                    {{ $description }}
                </p>
            </div>
            <table class="pdf-a4-row-5" cellpadding="0" cellspacing="0">
                <tr>
                    @if(!empty($images[0]))
                        <td class="a4-row-5-left" colspan="1">
                            <div class="pdf-a4-product-images">
                                 <img src="{{public_path($images[0]->url) }}" alt="PosebanPoklon">
                            </div>
                        </td>
                    @endif
                    @if(!empty($images[1]))
                        <td class="a4-row-5-right" colspan="1">
                            <div class="pdf-a4-product-images">
                                 <img src="{{public_path($images[1]->url) }}" alt="PosebanPoklon">
                            </div>
                        </td>
                    @endif
                </tr>
            </table>
            <table class="pdf-a4-row-6" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="pdf-a4-information-col">
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-location-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-loc">
                                        <div class="pdf-a4-information-title">Lokacija</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $location }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-clock-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-clock">
                                        <div class="pdf-a4-information-title">Trajanje usluge</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $time_duration }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="pdf-a4-information-col">
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-user-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-loc">
                                        <div class="pdf-a4-information-title">Poklon za</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $visitors }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-user-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-user">
                                        <div class="pdf-a4-information-title">Gledaoci</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $za_gledaoce }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="pdf-a4-information-col">
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-weather-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-cloud">
                                        <div class="pdf-a4-information-title">Vremenski uslovi</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $weather }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-tshirt-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-tsh">
                                        <div class="pdf-a4-information-title">Pravila oblačenja</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $dress_code }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="pdf-a4-full-width">
                        <table class="pdf-a4-information-item" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div class="pdf-a4-information-icon">
                                        <img src="images/pdf/pdf-information-icon.png" alt="PosebanPoklon"
                                            class="a4-information-icon">
                                    </div>
                                </td>
                                <td>
                                    <div class="pdf-a4-information-desc a4-info">
                                        <div class="pdf-a4-information-title">Dodatne informacije</div>
                                        <div class="pdf-a4-information-text">
                                            {{ $additional_info }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table class="pdf-a4-row-7">
                <tr>
                    <td class="pdf-a4-row-7-col">
                        <span class="pdf-a4-footer-text">
                            <span class="a4-footer-text-color">1. Rezerviši termin!</span>
                            <br>Nakon dobijanja vaučera obavezno je zakazivanje
                            <br>termina kontakt telefona: {{ $company_phone }}
                            <br><span class="a4-footer-text-color">2. Ne zaboravi da poneseš vaučer!</span>
                            <br>Ovaj vaučer se može iskoristiti samo jednom i ne
                            <br>može se zameniti za novac.
                            <br><span class="a4-footer-text-color">3. Iskusi poklon!</span>
                            <br>Doživi nezaboravne trenutke i uživaj u svom poklonu.
                        </span>
                    </td>
                    <td class="pdf-a4-row-7-col pdf-a4-footer-qrcode">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="pdf-a4-footer-text">
                                    <span class="a4-footer-text-color">Period validnosti:</span>
                                    <br> {{ $end_date }}
                                    <br><span class="a4-footer-text-color">BROJ REZERVACIJE:</span>
                                    <br> {{ $activation_code }}
                                    <br><span class="a4-footer-text-color">Kod vaučera:</span>
                                    <br> {{ $voucher_code }}
                                </td>
                                <td class="a4-footer-qrcode-image">
                                    <img src="{{ public_path($qr_code) }}" alt="PosebanPoklon"
                                        class="a4-qrcode-image">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table class="pdf-a4-row-8" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="a4-sub-footer-item">
                        <img src="images/pdf/pdf-phone-icon.png" alt="PosebanPoklon" class="a4-sub-footer-icon">
                        <span class="a4-sub-footer-text">+38 1 60 533 5325</span>
                    </td>
                    <td class="a4-sub-footer-item a4-sub-footer-item-2">
                        <img src="images/pdf/pdf-email-icon.png" alt="PosebanPoklon" class="a4-sub-footer-icon">
                        <span class="a4-sub-footer-text">kontakt@posebanpoklon.rs</span>
                    </td>
                    <td class="a4-sub-footer-item a4-sub-footer-item-3">
                        <img src="images/pdf/pdf-fb-icon.png" alt="PosebanPoklon" class="a4-sub-footer-icon">
                        <span class="a4-sub-footer-text">PosebanPoklon</span>
                    </td>
                    <td class="a4-sub-footer-item a4-sub-footer-item-4">
                        <img src="images/pdf/pdf-inst-icon.png" alt="PosebanPoklon" class="a4-sub-footer-icon">
                        <span class="a4-sub-footer-text">poseban_poklon</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="pdf-a4-col-right">
            <table class="pdf-a4-right-table" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="pdf-a4-right-top">
                        <span class="pdf-a4-right-text">
                            ...pretvaramo snove u uspomene!
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="pdf-a4-right-bottom">
                        <img src="images/pdf/logo-a4-logo-white.png" alt="" class="pdf-a4-logo-white">
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>

</html>