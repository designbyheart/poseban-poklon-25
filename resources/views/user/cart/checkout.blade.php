@extends('layouts.app')

@section('seo_title', 'Poseban Poklon | Porudžbina')
@section('seo_description', 'Odjavi se sa sajta. Sledeći put možeš se ulogovati sa istim podacima')
@section('seo_keywords', 'Poseban poklon, poružbina, moj profil')

@section('content')

    <section class="breadcrumb-container container">
        <div class="row">
            <div class="col-lg-12 breadcrumb-row">
                <a href="/" class="breadcrumb-row-item">
                    <div class="breadcrumb-item-text">Naslovna</div>
                    <div class="breadcrumb-arrow">></div>
                </a>
                <a href="/checkout" class="breadcrumb-row-item">
                    <div class="breadcrumb-item-text">Porudžbina</div>
                </a>
            </div>
        </div>
    </section>

    <checkout-page></checkout-page>

@endsection
