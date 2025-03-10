<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="{{ asset('images/header/favicon.jpg') }}" sizes="16x16">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('seo_title')</title>

    <meta name="description" content="@yield('seo_description')">

    <meta name="keywords" content="@yield('seo_keywords')">

    <meta property="og:title" content="@yield('og_title')">

    <meta property="og:description" content="@yield('og_description')">

    <meta property="og:url" content="@yield('og_url')">

    @if (trim($__env->yieldContent('og_image')))
    <meta property="og:image" content="@yield('og_image')">
    @else
    <meta property="og:image" content="{{ $applicationParams->siteLogo }}">
    @endif

    <meta property="og:image:type" content="image/png">

    <meta property="og:image:width" content="600">

    <meta property="og:image:height" content="600">

    <meta property="product:brand" content="@yield('brand')">

    <meta property="product:availability" content="in stock">

    <meta property="product:condition" content="new">

    <meta property="product:price:amount" content="@yield('price')">

    <meta property="product:price:currency" content="@yield('currency')">

    <meta property="product:retailer_item_id" content="@yield('item_id')">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.0/css/all.css"
        integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y"
        crossorigin="anonymous">

    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-P6923Q2');
    </script>
    <!-- End Google Tag Manager -->

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/user/style.css') }}">

    <!-- Bootstrap grid -->
    <link rel="stylesheet" href="{{ asset('css/user/components/app/bootstrap-grid.css') }}">
    <link rel="stylesheet" href="{{ asset('css/user/updated-styles.css') }}">

    <!--Facebook Pixel-->
    {!! $fb_pixel !!}

    <!--Analitycs scripts-->
    @stack("head")


    <!--Custom CSS-->
    <style>
        @yield('styles') {
            ! ! $settings->custom_css ! !
        }
    </style>

</head>

<body class="has-background-light">

    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6923Q2"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="app">
        <common-header></common-header>
        @yield('content')
        <common-footer></common-footer>
    </div>

    <script>
        // Set global application parameters
        // window.applicationParams = Object.assign({}, {
        //     !!json_encode($applicationParams) !!
        // });
        window.applicationParams = JSON.parse('{{ json_encode($applicationParams) }}') ?? {};

        if (window.applicationParams.user !== null) {

            localStorage.setItem('userRole', window.applicationParams.user.role.name);

        }
    </script>

    <script src="{{ asset('js/user.js') }}"></script>
    <script src="{{ asset('js/user/helpers.js') }}" type="module"></script>
    <script src="{{ asset('js/user/hamburger.js') }}"></script>
    <script src="{{ asset('js/common/header.js') }}"></script>

     Explicitly include Swiper CSS to fix slider issues
    <link rel="stylesheet" href="https://unpkg.com/swiper@5.4.5/css/swiper.min.css">
    <script src="https://unpkg.com/swiper@5.4.5/js/swiper.min.js"></script>

    <!--Google Analytics-->
    {!! $google_analytics !!}

    <!--Custom JS-->
    {!! $settings->custom_js !!}

    @yield('scripts')

</body>

</html>
