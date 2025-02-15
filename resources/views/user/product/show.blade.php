@extends('layouts.app')

@if($product->seo_title != "")
    @section('seo_title', $product->seo_title)
    @section('og_title', $product->seo_title)
@else
    @section('seo_title', $product->title)
    @section('og_title', $product->title)
@endif

@if($product->seo_description != "")
    @section('seo_description', $product->seo_description)
    @section('og_description', $product->seo_description)
@else
    @section('seo_description', $product->description)
    @section('og_description', $product->description)
@endif

@section('seo_keywords', $product->seo_keywords)

@section('og_url', route('products.show', $product->slug))

@if(count($product->images))
    @section('og_image', $product->images->first()->url)
@else
    @section('og_image', '/images/default/product/posebanpoklon_product.jpg')
@endif

@section('brand', 'PosebanPoklon.rs')
@section('price', $product->price)
@section('currency', 'RSD')
@section('item_id', $product->id)

@section('content')

    <section class="breadcrumb-container container">
        <div class="row">
            <div class="col-lg-12 breadcrumb-row">
                @foreach($breadcrumbs as $link)
                    <div class="breadcrumb-row-item">
                        <a href="{{$link['url']}}">
                            <div class="breadcrumb-item-text">{{ $link['title'] }}</div>
                        </a>
                        @if(!$loop->last)
                            <div class="breadcrumb-arrow">></div>
                        @endif
                    </div>
                @endforeach
            </div>
        </div>
    </section>
    <section class="product-content container">
        <div class="row">
            <div class="col-lg-7 product-col-left">
                <wishlist-buttons :product="{{ $product }}"></wishlist-buttons>
                @if(count($product->images))
                    <product-carousel :slides="{{ $product->images }}"></product-carousel>
                @else
                    <product-carousel></product-carousel>
                @endif
            </div>
            <div class="col-lg-5 product-col-right">
                <div class="product-desc">
                    <h2 class="product-desc-title">{{ $product->title }}</h2>
                    <stars-rating :product-id="{{ $product->id }}" :rating="{{ $product_rating }}" :reviews-count="{{ $reviews_count }}"></stars-rating>
                    <div class="product-info-row">
                        @if(!empty($location))
                            <div class="product-info-location">
                                <img src="/images/icons/product_location_icon.svg" alt="" class="product-location-icon">
                                <span class="product-location-city">{{ $location }}</span>
                            </div>
                        @endif
                        @if(!empty($product->za_koga))
                            <div class="product-info-person">
                                <img src="/images/icons/product_person_icon.svg" alt="" class="product-person-icon">
                                <span class="product-person-number">{{ $product->za_koga }}</span>
                            </div>
                        @endif
                    </div>
                    <div class="product-desc-text">
                        {!! $product->short_description !!}
                    </div>
                    <!-- <div class="product-desc-select">
                        <select name="" id="" class="product-select-field">
                            <option value="Offer_1" class="product-select-item">Offer 1</option>
                            <option value="Offer_2" class="product-select-item">Offer 2</option>
                            <option value="Offer_3" class="product-select-item">Offer 3</option>
                            <option value="Offer_4" class="product-select-item">Offer 4</option>
                            <option value="Offer_5" class="product-select-item">Offer 5</option>
                        </select>
                    </div> -->
                    @if(count($product->children))
                    <p class="product-offer-title">Izabieri paket</p>
                        <div class="product-desc-offers">
                            @foreach($product->children as $children)
                                    <label class="product-offer-row">

                                        <a href="{{ route('products.show', $children->slug) }}">

                                            <input type="radio" name="gender" value="male" class="product-offer-check">
                                            <span class="product-check"></span>
                                            <div class="product-offer-text">
                                                <span class="product-offer-text-title">
                                                    {{ $children->title }}
                                                </span>
                                            </div>
                                            @if($children->discount_price > 0)
                                            <div class="product-offer-price-col">
                                                <div class="product-offer-price line-through">
                                                    <span class="offer-price-number">{{ $children->price }}</span>
                                                    <span class="offer-price-currency">RSD</span>
                                                </div>
                                                <div class="offer-discount-price">
                                                    <span class="main-price-number">{{ $children->discount_price }}</span>
                                                    <span class="offer-price-currency">RSD</span>
                                                </div>
                                            </div>
                                            @else
                                            <div class="product-offer-price-col">
                                                <div class="product-offer-price default-price-number">
                                                    <span class="offer-price-number">{{ $children->price }}</span>
                                                    <span class="offer-price-currency">RSD</span>
                                                </div>
                                            </div>
                                            @endif
                                        </a>

                                    </label>
                            @endforeach
                        </div>
                    @else
                        @if($product->discount_price > 0)
                            <div class="product-main-price">
                                <div class="main-price main-price-sale">
                                    <span class="main-price-number">{{ $product->price }} RSD</span>
                                </div>
                                <div class="sale-price">
                                    <span class="sale-price-line"> - </span>
                                    <span class="main-price-number">{{ $product->discount_price }}</span>
                                    <span class="main-price-currency">RSD</span>
                                </div>
                            </div>
                        @else
                            <div class="product-main-price">
                                <div class="main-price">
                                    <span class="main-price-number">{{ $product->price }}</span>
                                    <span class="main-price-currency">RSD</span>
                                </div>
                            </div>
                        @endif
                    @endif
                </div>
                @if(!count($product->children))
                    <add-to-cart :product="{{ $product }}"></add-to-cart>
                @endif
            </div>
        </div>
    </section>
    <section class="product-description container">
        <div class="row">
            <div class="col-lg-12 product-info-container">
                <h3 class="product-info-title">
                    {{ $product->title }}
                </h3>
                <div class="product-info-text">
                    {!! $product->description !!}
                </div>
            </div>
        </div>
    </section>
    <section class="product-information-table container">
        <div class="row">
            <div class="col-lg-12 product-table-container">
                <h3 class="product-table-title">
                    Detalji ponude
                </h3>
                <div class="product-table">
                    <div class="product-table-item">
                        <img src="/images/icons/product_table_user.svg" alt="" class="table-item-icon">
                        <span class="table-item-desc">
                            <span class="table-item-title">Poklon za</span>
                            <span class="table-item-subtitle">{{ $properties['visitors'] }}</span>
                        </span>
                    </div>
                    <div class="product-table-item">
                        <img src="/images/icons/product_table_clock.svg" alt="" class="table-item-icon">
                        <span class="table-item-desc">
                            <span class="table-item-title">Trajanje usluge</span>
                            <span class="table-item-subtitle">{{ $properties['duration'] }}</span>
                        </span>
                    </div>
                    <div class="product-table-item">
                        <img src="/images/icons/product_table_tshirt.svg" alt="" class="table-item-icon">
                        <span class="table-item-desc">
                            <span class="table-item-title">Pravila oblačenja</span>
                            <span class="table-item-subtitle">{{ $properties['dress_code'] }}</span>
                        </span>
                    </div>
                    <div class="product-table-item">
                        <img src="/images/icons/product_table_location.svg" alt="" class="table-item-icon">
                        <span class="table-item-desc">
                            <span class="table-item-title">Lokacija</span>
                            <span class="table-item-subtitle">{{ $properties['location'] }}</span>
                        </span>
                    </div>
                    <div class="product-table-item">
                        <img src="/images/icons/product_table_weather.svg" alt="" class="table-item-icon">
                        <span class="table-item-desc">
                            <span class="table-item-title">Vremenski uslovi</span>
                            <span class="table-item-subtitle">{{ $properties['weather'] }}</span>
                        </span>
                    </div>
                    @if(!empty($properties['za_gledaoce']))
                        <div class="product-table-item">
                            <img src="/images/icons/product_table_user.svg" alt="" class="table-item-icon">
                            <span class="table-item-desc">
                                <span class="table-item-title">Gledaoci</span>
                                <span class="table-item-subtitle">{{ $properties['za_gledaoce'] }}</span>
                            </span>
                        </div>
                    @endif
                    <div class="product-table-item product-table-item-full">
                        <img src="/images/icons/product_table_info.svg" alt="" class="table-item-icon">
                        <span class="table-item-desc">
                            <span class="table-item-title">Dodatne informacije</span>
                            <span class="table-item-subtitle">{{ $properties['additional_info'] }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <popular-products></popular-products>
    <recommended-products title="PREPORUČUJEMO"></recommended-products>

@endsection