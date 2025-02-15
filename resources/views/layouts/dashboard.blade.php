<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title></title>

    <meta name="description" content="">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Dashboard Styles -->
    <link rel="stylesheet" href="{{ asset('css/dashboard/main.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard/iconfont.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard/material-icons/material-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard/vuesax.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard/prism-tomorrow.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard/app.css') }}">
    <link href="{{ asset('css/dashboard/custom.css') }}" rel="stylesheet">

</head>

<body class="has-background-light">

    <div id="app"></div>

    <script>

        //Set global application parameters
        window.applicationParams = Object.assign({}, {!! json_encode($applicationParams) !!});

        localStorage.setItem('userRole', window.applicationParams.user.role.name);

    </script>

    <script src="{{ asset('js/dashboard.js') }}"></script>

</body>

</html>
