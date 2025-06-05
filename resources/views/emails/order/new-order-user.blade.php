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
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 20px 0;
        }

        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #777;
        }

        .payment-instructions {
            background-color: #f5f5f5;
            padding: 15px;
            border-left: 4px solid #3498db;
            margin: 20px 0;
        }

        .payment-details {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        .payment-details td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .payment-details td:first-child {
            width: 40%;
        }

        h3 {
            color: #3498db;
            margin-top: 0;
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

            @if(isset($order) && $order->payment_method_id == 2)
            <div class="payment-instructions">
                <h3>Instrukcije za plaćanje</h3>
                <p>Za završetak porudžbine potrebno je da izvršite uplatu na sledeći račun:</p>
                
                <table class="payment-details">
                    <tr>
                        <td><strong>Primalac:</strong></td>
                        <td>Turistička agencija Republika 031</td>
                    </tr>
                    <tr>
                        <td><strong>Adresa primaoca:</strong></td>
                        <td>Svetozara Lazovića Gonga 4, 31000 Užice, Srbija</td>
                    </tr>
                    <tr>
                        <td><strong>Broj računa:</strong></td>
                        <td>160-6000002025893-02</td>
                    </tr>
                    <tr>
                        <td><strong>Svrha uplate:</strong></td>
                        <td>Porudžbina br. {{ $order->id }}</td>
                    </tr>
                    <tr>
                        <td><strong>Iznos za uplatu:</strong></td>
                        <td>{{ $order->total }} RSD</td>
                    </tr>
                </table>
                
                <p>Nakon što izvršite uplatu, vaša porudžbina će biti obrađena i poslata na adresu koju ste naveli.</p>
                <p>Ukoliko imate bilo kakvih pitanja, molimo Vas da nas kontaktirate.</p>
            </div>
            @endif

            <p>Srdačan pozdrav,<br>Tim Poseban Poklon</p>
        </div>

        <div class="footer">
            <p>  {{ date('Y') }} Poseban Poklon. Sva prava zadržana.</p>
        </div>
    </div>
</body>

</html>
