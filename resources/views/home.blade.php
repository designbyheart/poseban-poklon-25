@extends('layouts.app')

@section('seo_title', $seo_title)
@section('seo_description', $seo_description)
@section('seo_keywords', $seo_keywords)

@section('content')

<!--Home page slider-->
<home-slider :slides="{{ json_encode($page_layout->slider->slides) }}"></home-slider>

<!--Products filter bar-->
<filter-bar :location-options="{{ $locationAttributes }}" :visitors-options="{{ $visitorsAttributes }}"></filter-bar>

<section class="home-info-container">
    <div class="container">
        <a href="/garancije">
            <div class="home-info-row">
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/gift_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">POKLON VAUČERI</p>
                        <p class="item-desc">važe godinu dana</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/report_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">BESPLATNA ZAMENA</p>
                        <p class="item-desc">za sve vaučere</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/round_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">365 DANA ZAMENE</p>
                        <p class="item-desc">za sve vaučere</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/credit_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">BEZBEDNA</p>
                        <p class="item-desc">kupovina</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/truck_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">BESPLATNA DOSTAVA</p>
                        <p class="item-desc">preko 9900 RSD</p>
                    </div>
                </div>
            </div>
        </a>
    </div>
</section>

<recommended-products title="PREPORUČUJEMO"></recommended-products>

<!--Carousel-->

<!--Categories builder section-->
<section class="home-masonry-container container">
    <div class="section-title-container">
        <h3 class="col-md-12 section-title">
            {{ $page_layout->sectionTitles->category->value }}
        </h3>
    </div>
    <div class="home-masonry-row row">
        <div class="home-masonry-col-left col-md-9">
            <div class="home-masonry-col-top row">
                <div class="col-md-8 top-left left-col">
                    <a class="home-masonry-item" href="{{ $page_layout->categories->items[0]->link }}"
                        style="background-image: url({{ $page_layout->categories->items[0]->image[0]->url }});">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                {{ $page_layout->categories->items[0]->title }}
                            </h4>
                            <p class="masonry-desc">
                                {{ $page_layout->categories->items[0]->subtitle }}
                            </p>
                            @if($page_layout->categories->items[0]->showButton)
                            <p class="masonry-btn">
                                {{ $page_layout->categories->items[0]->buttonText }}
                            </p>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-4 top-right left-col">
                    <a class="home-masonry-item" href="{{ $page_layout->categories->items[1]->link }}"
                        style="background-image: url({{ $page_layout->categories->items[1]->image[0]->url }});">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                {{ $page_layout->categories->items[1]->title }}
                            </h4>
                            <p class="masonry-desc">
                                {{ $page_layout->categories->items[1]->subtitle }}
                            </p>
                            @if($page_layout->categories->items[1]->showButton)
                            <p class="masonry-btn">
                                {{ $page_layout->categories->items[1]->buttonText }}
                            </p>
                            @endif
                        </div>
                    </a>
                </div>
            </div>
            <div class="home-masonry-col-bottom row">
                <div class="col-md-4 bottom-left left-col">
                    <a class="home-masonry-item" href="{{ $page_layout->categories->items[2]->link }}"
                        style="background-image: url({{ $page_layout->categories->items[2]->image[0]->url }});">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                {{ $page_layout->categories->items[2]->title }}
                            </h4>
                            <p class="masonry-desc">
                                {{ $page_layout->categories->items[2]->subtitle }}
                            </p>
                            @if($page_layout->categories->items[2]->showButton)
                            <p class="masonry-btn">
                                {{ $page_layout->categories->items[2]->buttonText }}
                            </p>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="col-md-8 bottom-right left-col">
                    <a class="home-masonry-item" href="{{ $page_layout->categories->items[3]->link }}"
                        style="background-image: url({{ $page_layout->categories->items[3]->image[0]->url }});">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                {{ $page_layout->categories->items[3]->title }}
                            </h4>
                            <p class="masonry-desc">
                                {{ $page_layout->categories->items[3]->subtitle }}
                            </p>
                            @if($page_layout->categories->items[3]->showButton)
                            <p class="masonry-btn">
                                {{ $page_layout->categories->items[3]->buttonText }}
                            </p>
                            @endif
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="home-masonry-col-right col-md-3">
            <a class="home-masonry-item" href="{{ $page_layout->categories->items[4]->link }}"
                style="background-image: url({{ $page_layout->categories->items[4]->image[0]->url }});">
                <div class="home-masonry-item-hover">
                    <h4 class="masonry-title">
                        {{ $page_layout->categories->items[4]->title }}
                    </h4>
                    <p class="masonry-desc">
                        {{ $page_layout->categories->items[4]->subtitle }}
                    </p>
                    @if($page_layout->categories->items[4]->showButton)
                    <p class="masonry-btn">
                        {{ $page_layout->categories->items[4]->buttonText }}
                    </p>
                    @endif
                </div>
            </a>
        </div>
    </div>
</section>

<popular-products></popular-products>

<!--<div class="bank-logo-row home">
    <a href="https://www.bancaintesa.rs/" target="_blank" class="bank-img">
        <img src="/images/checkout/logo_intesa.png"/>
    </a>
    <img class="bank-img" src="/images/checkout/visa.png"/>
    <img class="bank-img" src="/images/checkout/mastercard.png"/>
    <img class="bank-img" src="/images/checkout/maestro.png"/>
</div>-->

<section class="home-information-container">
    <div class="home-information-row" style="background-image: url({{ $page_layout->aboutUs->image[0]->url }});">
        <div class="home-information-text container">
            <h2 class="information-title">
                {{ $page_layout->aboutUs->title }}
            </h2>
            <p class="information-desc">
                {{ $page_layout->aboutUs->description }}
            </p>
        </div>
    </div>
    <div class="home-information-row-buttons container">
        @foreach($page_layout->bottomLinks as $button)
        <div class="information-button">
            <a href="{{ $button->link }}" class="information-link">
                <span>{{ $button->title }}</span>
            </a>
        </div>
        @endforeach
    </div>
</section>

@endsection