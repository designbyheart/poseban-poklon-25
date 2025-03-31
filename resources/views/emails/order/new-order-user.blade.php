<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Potvrda porudžbine - Poseban Poklon</title>
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

        .order-details {
            margin: 20px 0;
            border: 1px solid #ddd;
            padding: 15px;
        }

        .order-item {
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Hvala na Vašoj porudžbini!</h1>
        </div>

        <div class="content">
            <p>Poštovani,</p>

            <p>Uspešno ste izvršili porudžbinu br. {{ $order->id }} na sajtu Poseban Poklon.</p>

            <div class="order-details">
                <h3>Detalji porudžbine:</h3>
                <p><strong>Datum:</strong> {{ $order->created_at->format('d.m.Y H:i') }}</p>
                <p><strong>Ukupan iznos:</strong> {{ number_format($order->total, 2) }} RSD</p>
                <p><strong>Način plaćanja:</strong> {{ $order->paymentMethod->name ?? 'Nepoznato' }}</p>

                <h4>Stavke:</h4>
                @foreach($order->items as $item)
                <div class="order-item">
                    {{ $item->product_quantity }} x {{ $item->product->title }} - {{ number_format($item->product_total, 2) }} RSD
                </div>
                @endforeach
            </div>

            @if($order->shipping_method_id === 9)
            <p><strong>Vaši e-vaučeri će biti generisani u narednih nekoliko minuta i poslati na Vašu email adresu.</strong></p>
            <p>Ukoliko ne primite e-vaučere u roku od 15 minuta, molimo Vas da proverite folder "Spam" ili nas kontaktirate.</p>
            @endif

            <p>Srdačan pozdrav,<br>Tim Poseban Poklon</p>
        </div>

        <div class="footer">
            <p>© {{ date('Y') }} Poseban Poklon. Sva prava zadržana.</p>
        </div>
    </div>
</body>

</html>