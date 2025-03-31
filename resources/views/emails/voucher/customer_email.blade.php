<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Vaši e-vaučeri - Poseban Poklon</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }

        .voucher-info {
            margin: 20px 0;
            border: 1px solid #ddd;
            padding: 15px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Vaši e-vaučeri su spremni!</h1>
        </div>

        <div class="content">
            <p>Poštovani,</p>

            <p>U prilogu ovog emaila nalaze se e-vaučeri za Vašu porudžbinu br. {{ $order->id }}.</p>

            <div class="voucher-info">
                <h3>Uputstvo za korišćenje:</h3>
                <ol>
                    <li>Preuzmite PDF fajlove sa e-vaučerima</li>
                    <li>Štampajte ih ili sačuvajte na svom uređaju</li>
                    <li>Prikazite vaučer prilikom realizacije usluge</li>
                </ol>

                <p><strong>Važi do:</strong> {{ $order->vouchers->first()->end_date->format('d.m.Y') }}</p>
            </div>

            <p>Ukoliko imate bilo kakvih pitanja u vezi sa Vašim vaučerima, slobodno nas kontaktirajte.</p>

            <p>Srdačan pozdrav,<br>Tim Poseban Poklon</p>
        </div>

        <div class="footer">
            <p>© {{ date('Y') }} Poseban Poklon. Sva prava zadržana.</p>
        </div>
    </div>
</body>

</html>