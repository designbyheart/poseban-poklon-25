@extends('layouts.email')

@section('content')
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

                @if($order->vouchers->count() > 0)
                    <p><strong>Važi do:</strong> {{ \Carbon\Carbon::parse($order->vouchers->first()->end_date)->format('d.m.Y') }}</p>
                @endif
            </div>

            <p>Ukoliko imate bilo kakvih pitanja u vezi sa Vašim vaučerima, slobodno nas kontaktirajte.</p>

            <p>Srdačan pozdrav,<br>Tim Poseban Poklon</p>
        </div>

        <div class="footer">
            <p>© {{ \Carbon\Carbon::now()->format('Y') }} Poseban Poklon. Sva prava zadržana.</p>
        </div>
    </div>
@endsection
