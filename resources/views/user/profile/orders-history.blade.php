@extends('layouts.app')

@section('seo_title', 'Poseban poklon | Moje porudžbine')
@section('seo_description', 'Ovde možeš videti ponude koje si poručio')

@section('content')

    <section class="profile-container container">
        <div class="row">
            <profile-sidebar></profile-sidebar>
            <div class="col-lg-9 col-md-9 profile-content-history">
                <div class="profile-information-form">
                    <h4 class="information-form-title">
                        Istorija porudžbina
                    </h4>
                    <div class="information-history-table">
                        <div class="history-row">
                            <div class="history-col-1 history-item">
                                <span class="history-item-title">Broj porudžbine</span>
                            </div>
                            <div class="history-col-2 history-item">
                                <span class="history-item-title">Status</span>
                            </div>
                            <div class="history-col-3 history-item">
                                <span class="history-item-title">Datum</span>
                            </div>
                            <div class="history-col-4 history-item">
                                <span class="history-item-title">Cena</span>
                            </div>
                            <div class="history-col-4 history-item">
                                <span class="history-item-title">Popust</span>
                            </div>
                            <div class="history-col-4 history-item">
                                <span class="history-item-title">Ukupna cena</span>
                            </div>
                        </div>
                        @foreach($orders as $order)

                            <div class="history-row">
                                <div class="history-col-1 history-item">
                                    <span class="history-item-text">{{ $order->id }}</span>
                                </div>
                                <div class="history-col-2 history-item">
                                    <span class="history-item-text">{{ $order->status->title }}</span>
                                </div>
                                <div class="history-col-3 history-item">
                                    <span class="history-item-text">{{ \Carbon\Carbon::parse($order->created_at)->format('d.m.Y') }}</span>
                                </div>
                                <div class="history-col-4 history-item">
                                <span class="history-item-text">{{ $order->subtotal }}
                                    <span class="history-item-currency">RSD</span>
                                </span>
                                </div>
                                <div class="history-col-4 history-item">
                                <span class="history-item-text">{{ $order->discount }}
                                    <span class="history-item-currency">RSD</span>
                                </span>
                                </div>
                                <div class="history-col-4 history-item">
                                <span class="history-item-text">{{ $order->total }}
                                    <span class="history-item-currency">RSD</span>
                                </span>
                                </div>
                            </div>

                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection