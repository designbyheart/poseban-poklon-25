<!DOCTYPE html>
<html>

<head>
    <title>{{ $title }}</title>
    <!-- Styles -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="{{ public_path('css/user/components/pdf/pdf-a5.css') }}">

    <style>
        html,
        body {
            padding: 0 !important;
            margin: 0 !important;
        }
    </style>
</head>

<body class="pdf-a5-body">
    <div class="pdf-a5-template">
        <div class="pdf-a5-row-1">
            <table class="pdf-a5-1-grey" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="pdf-a5-col-1-left">
                        <img src="images/pdf/logo-pdf-a5.png" alt="" class="pdf-a5-logo">
                    </td>
                    <td class="pdf-a5-col-1-right">
                        <div class="pdf-a5-1-text">...poklon koji se pamti!</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="pdf-a5-row-2">
            <table class="pdf-a5-2-main-table" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="pdf-a5-2-col pdf-a5-left">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="pdf-a5-col-2-left">
                                    <div class="pdf-a5-2-title">
                                        @if(!empty ($personal_message))
                                        {{ $personal_message }}
                                        @else
                                        <p class="without_message_a5"></p>
                                        @endif
                                    </div>
                                    <table class="pdf-a5-2-table" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td class="pdf-a5-2-table-item a5-table-item-left">
                                                <table class="pdf-a5-table-border-none">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-location-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Lokacija</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="a5-item-desc-full a5-desc-2" colspan="2">
                                                            <div class="a5-desc-text">
                                                                {{ $location }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="pdf-a5-2-table-item a5-table-item-right">
                                                <table class="pdf-a5-table-border-none">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-clock-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Trajanje usluge</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="a5-item-desc-full a5-desc-2" colspan="2">
                                                            <div class="a5-desc-text">
                                                                {{ $time_duration }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pdf-a5-2-table-item a5-table-item-left">
                                                <table class="pdf-a5-table-border">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-user-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Poklon za</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="a5-item-desc-full a5-desc-2" colspan="2">
                                                            <div class="a5-desc-text">
                                                                {{ $visitors }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="pdf-a5-2-table-item a5-table-item-right">
                                                <table class="pdf-a5-table-border">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-user-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Gledaoci</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="a5-item-desc-full a5-desc-2" colspan="2">
                                                            <div class="a5-desc-text">
                                                                {{ $za_gledaoce }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pdf-a5-2-table-item a5-table-item-left">
                                                <table class="pdf-a5-table-border-none">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-weather-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Vremenski uslovi</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="a5-item-desc-full a5-desc-2" colspan="2">
                                                            <div class="a5-desc-text">
                                                                {{ $weather }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="pdf-a5-2-table-item a5-table-item-right">
                                                <table class="pdf-a5-table-border-none">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-tshirt-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Pravila oblacenja</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="a5-item-desc-full a5-desc-2" colspan="2">
                                                            <div class="a5-desc-text">
                                                                {{ $dress_code }}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="a5-item-more-information">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td class="a5-item-image">
                                                            <img src="images/pdf/pdf-information-icon.png" alt=""
                                                                class="a5-item-icon">
                                                        </td>
                                                        <td class="a5-item-desc">
                                                            <div class="a5-desc-title">Dodatne informacije</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="more-information" colspan="2">
                                                <div class="a5-desc-text">
                                                    {{ $additional_info }}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="a5-2-desc-left">
                                    <table class="a5-desc-table_code" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td class="a5-desc-col">
                                                <div class="a5-desc-text-color">1. Rezerviši termin!</div>
                                                <div class="a5-desc-text">Nakon dobijanja vaučera obavezno<br>je
                                                    zakazivanje
                                                    termina putem <br>kontakt telefona: {{ $company_phone }}</div>
                                                <div class="a5-desc-text-color">2. Ne zaboravi da poneseš vaučer!</div>
                                                <div class="a5-desc-text">Ovaj vaučer se može iskoristiti samo <br>
                                                    jendom i ne može
                                                    se
                                                    zameniti za novac.</div>
                                                <div class="a5-desc-text-color">3. Iskusi poklon!</div>
                                                <div class="a5-desc-text">Doživi nezaboravne trenutke i uživaj u svom
                                                    poklonu.</div>
                                            </td>
                                            <td class="a5-desc-col code-right">
                                                <table class="a5-desc-qcode" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td class="a5-desc-qcode-col">
                                                            <div class="a5-desc-info-title">PERIOD VALIDNOSTI:</div>
                                                            <div class="a5-desc-info-subtitle">{{ $end_date }}</div>
                                                            <div class="a5-desc-info-title">BROJ REZERVACIJE:</div>
                                                            <div class="a5-desc-info-subtitle">{{ $activation_code }}
                                                            </div>
                                                            <div class="a5-desc-info-title">KOD VAUČERA:</div>
                                                            <div class="a5-desc-info-subtitle">{{ $voucher_code }}</div>
                                                        </td>
                                                        <td class="a5-desc-qcode-col">
                                                            <img src="{{ public_path($qr_code) }}"
                                                                class="a5-qcode-image" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="pdf-a5-2-col pdf-a5-right">
                        <table class="a5-image-desc-table" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="pdf-a5-col-2-right">
                                    <div class="pdf-a5-image-container">
                                        <div class="pdf-a5-main-image">
                                            <img src="{{public_path($images[0]->url) }}" class="main-product-img"
                                                style="width: 370px; height: 350px;">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="a5-2-desc-right">
                                    <div class="a5-2-desc-title">
                                        {{ $product_title }}
                                    </div>
                                    <div class="a5-2-desc-text">
                                        {{ $description }}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div class="pdf-a5-row-3">
            <table class="pdf-a5-footer-table" сellpadding="0" cellspacing="0">
                <tr>
                    <td class="pdf-a5-footer-item">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <img src="images/pdf/pdf-gift-white.png" class="a5-footer-item-img">
                                </td>
                                <td>
                                    <div class="a5-footer-item-box">
                                        <div class="a5-footer-item-title">
                                            POKLON VAUČERI
                                        </div>
                                        <div class="a5-footer-item-text">
                                            važe godinu dana
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="pdf-a5-footer-item">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <img src="images/pdf/pdf-arrows-white.png" class="a5-footer-item-img">
                                </td>
                                <td>
                                    <div class="a5-footer-item-box">
                                        <div class="a5-footer-item-title">
                                            365 DANA ZAMENE
                                        </div>
                                        <div class="a5-footer-item-text">
                                            za sve vaučere
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="pdf-a5-footer-item">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <img src="images/pdf/pdf-cart-white.png" class="a5-footer-item-img">
                                </td>
                                <td>
                                    <div class="a5-footer-item-box">
                                        <div class="a5-footer-item-title">
                                            BEZBEDNA
                                        </div>
                                        <div class="a5-footer-item-text">
                                            kupovina
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="pdf-a5-footer-item">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <img src="images/pdf/pdf-truck-white.png" class="a5-footer-item-img">
                                </td>
                                <td>
                                    <div class="a5-footer-item-box">
                                        <div class="a5-footer-item-title">
                                            BESPLATNA DOSTAVA
                                        </div>
                                        <div class="a5-footer-item-text">
                                            preko 9900 RSD
                                        </div>
                                    </div>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>

</html>